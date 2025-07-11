import { createClient } from 'npm:@supabase/supabase-js@2.50.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface RegistrationData {
  email: string
  firstName?: string
  babyAge?: string
  relationDuration?: string
  relationStatus?: string
  mainChallenges?: string[]
  urgencyLevel?: string
  motivation?: string
  acceptsEmails?: boolean
  isQualificationComplete?: boolean
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role key for bypassing RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const registrationData: RegistrationData = await req.json()

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id, email, first_name')
      .eq('email', registrationData.email)
      .maybeSingle()

    let user = existingUser

    if (!existingUser) {
      // Create new user
      const { data: newUser, error: userError } = await supabaseAdmin
        .from('users')
        .insert({
          email: registrationData.email,
          first_name: registrationData.firstName || '',
          subscription_status: 'trial',
          trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        })
        .select()
        .single()

      if (userError) {
        throw userError
      }

      user = newUser
    } else if (registrationData.firstName && registrationData.firstName !== existingUser.first_name) {
      // Update existing user with new information
      const { data: updatedUser, error: updateError } = await supabaseAdmin
        .from('users')
        .update({
          first_name: registrationData.firstName,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingUser.id)
        .select()
        .single()

      if (updateError) {
        throw updateError
      }

      user = updatedUser
    }

    let qualification = null

    // Create qualification if this is a complete registration
    if (registrationData.isQualificationComplete && registrationData.babyAge) {
      const { data: newQualification, error: qualificationError } = await supabaseAdmin
        .from('qualifications')
        .insert({
          user_id: user.id,
          baby_age: registrationData.babyAge,
          relation_duration: registrationData.relationDuration || '',
          relation_status: registrationData.relationStatus || '',
          main_challenges: registrationData.mainChallenges || [],
          urgency_level: registrationData.urgencyLevel || '',
          motivation: registrationData.motivation || ''
        })
        .select()
        .single()

      if (qualificationError) {
        throw qualificationError
      }

      qualification = newQualification
    }

    // Create email subscription if user accepts emails
    if (registrationData.acceptsEmails) {
      const { error: emailError } = await supabaseAdmin
        .from('email_subscriptions')
        .insert({
          user_id: user.id,
          email: registrationData.email
        })

      if (emailError && emailError.code !== '23505') { // Ignore duplicate key errors
        console.warn('Email subscription error:', emailError)
      }
    }

    // Send welcome email
    try {
      const emailApiUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/send-welcome-email`
      
      await fetch(emailApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: registrationData.email,
          firstName: registrationData.firstName || 'Futur(e) parent',
          isQualificationComplete: registrationData.isQualificationComplete || false
        })
      })
    } catch (emailError) {
      console.warn('Welcome email error:', emailError)
      // Don't fail the registration for email issues
    }

    return new Response(
      JSON.stringify({
        success: true,
        user,
        qualification,
        message: 'Registration successful'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Registration error:', error)
    
    let errorMessage = 'Registration failed'
    
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'object' && error !== null) {
      const supabaseError = error as any
      if (supabaseError.code) {
        switch (supabaseError.code) {
          case '23505':
            errorMessage = 'Email already exists'
            break
          default:
            errorMessage = supabaseError.message || `Database error: ${supabaseError.code}`
        }
      }
    }
    
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})