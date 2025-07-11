import { createClient } from 'npm:@supabase/supabase-js@2.50.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface EmailData {
  to: string
  firstName: string
  isQualificationComplete: boolean
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { to, firstName, isQualificationComplete }: EmailData = await req.json()

    // Configuration de l'email
    const emailSubject = isQualificationComplete 
      ? `🎉 ${firstName}, bienvenue dans Sleep Harmony !`
      : `👋 ${firstName}, merci pour votre intérêt pour Sleep Harmony`

    const emailContent = isQualificationComplete 
      ? getWelcomeEmailWithQualification(firstName)
      : getSimpleWelcomeEmail(firstName)

    // Ici vous pouvez intégrer votre service d'email préféré
    // Pour l'exemple, nous utilisons un service d'email fictif
    const emailResponse = await sendEmail({
      to,
      subject: emailSubject,
      html: emailContent,
      from: 'Sleep Harmony <contact@sleepharmony.fr>'
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email de bienvenue envoyé avec succès',
        emailId: emailResponse.id 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Erreur lors de l\'envoi de l\'email de bienvenue' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})

function getWelcomeEmailWithQualification(firstName: string): string {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenue dans Sleep Harmony</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px;
        }
        .header { 
          background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%); 
          color: white; 
          padding: 30px 20px; 
          text-align: center; 
          border-radius: 12px 12px 0 0; 
        }
        .content { 
          background: white; 
          padding: 30px 20px; 
          border: 1px solid #e5e7eb; 
          border-top: none;
        }
        .footer { 
          background: #f9fafb; 
          padding: 20px; 
          text-align: center; 
          border-radius: 0 0 12px 12px; 
          border: 1px solid #e5e7eb; 
          border-top: none;
        }
        .highlight { 
          background: #dbeafe; 
          padding: 20px; 
          border-radius: 8px; 
          margin: 20px 0; 
          border-left: 4px solid #3B82F6;
        }
        .button { 
          display: inline-block; 
          background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%); 
          color: white; 
          padding: 15px 30px; 
          text-decoration: none; 
          border-radius: 8px; 
          font-weight: 600; 
          margin: 20px 0;
        }
        .checklist { 
          background: #f0fdf4; 
          padding: 20px; 
          border-radius: 8px; 
          margin: 20px 0;
        }
        .checklist li { 
          margin: 10px 0; 
          padding-left: 25px; 
          position: relative;
        }
        .checklist li:before { 
          content: "✅"; 
          position: absolute; 
          left: 0;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0; font-size: 28px;">🌙 Sleep Harmony</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Votre parcours vers une relation épanouie commence maintenant</p>
      </div>
      
      <div class="content">
        <h2>Bonjour ${firstName} ! 👋</h2>
        
        <p><strong>Félicitations !</strong> Vous venez de franchir la première étape vers une relation de couple plus harmonieuse.</p>
        
        <div class="highlight">
          <h3 style="margin-top: 0;">🎉 Votre essai gratuit de 7 jours a commencé</h3>
          <p>Grâce aux informations que vous avez partagées, nous préparons déjà vos premiers conseils personnalisés.</p>
        </div>
        
        <h3>Ce qui vous attend dans les prochaines heures :</h3>
        <div class="checklist">
          <ul style="list-style: none; padding: 0;">
            <li>📧 Vos premiers conseils personnalisés (dans 2h maximum)</li>
            <li>📱 Accès à votre tableau de bord Sleep Harmony</li>
            <li>📊 Outils de suivi du sommeil de bébé et de votre relation</li>
            <li>💡 Recommandations adaptées à votre situation unique</li>
          </ul>
        </div>
        
        <div class="highlight">
          <h3 style="margin-top: 0;">💡 Conseil de Thomas (fondateur)</h3>
          <p><em>"La première semaine est cruciale. Prenez 2 minutes chaque matin pour noter comment bébé a dormi et votre humeur de couple. Vous serez surpris des liens que vous découvrirez !"</em></p>
        </div>
        
        <p><strong>Important :</strong> Ajoutez <code>contact@sleepharmony.fr</code> à vos contacts pour être sûr(e) de recevoir tous nos emails.</p>
        
        <p>Vous avez des questions ? Répondez simplement à cet email, nous vous répondrons personnellement.</p>
        
        <p>À très bientôt,<br>
        <strong>L'équipe Sleep Harmony</strong> 💙</p>
      </div>
      
      <div class="footer">
        <p style="margin: 0; font-size: 14px; color: #6b7280;">
          Sleep Harmony - L'application qui aide les couples à retrouver leur complicité après bébé<br>
          <a href="mailto:contact@sleepharmony.fr" style="color: #3B82F6;">contact@sleepharmony.fr</a>
        </p>
      </div>
    </body>
    </html>
  `
}

function getSimpleWelcomeEmail(firstName: string): string {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Merci pour votre intérêt - Sleep Harmony</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px;
        }
        .header { 
          background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%); 
          color: white; 
          padding: 30px 20px; 
          text-align: center; 
          border-radius: 12px 12px 0 0; 
        }
        .content { 
          background: white; 
          padding: 30px 20px; 
          border: 1px solid #e5e7eb; 
          border-top: none;
        }
        .footer { 
          background: #f9fafb; 
          padding: 20px; 
          text-align: center; 
          border-radius: 0 0 12px 12px; 
          border: 1px solid #e5e7eb; 
          border-top: none;
        }
        .highlight { 
          background: #dbeafe; 
          padding: 20px; 
          border-radius: 8px; 
          margin: 20px 0; 
          border-left: 4px solid #3B82F6;
        }
        .button { 
          display: inline-block; 
          background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%); 
          color: white; 
          padding: 15px 30px; 
          text-decoration: none; 
          border-radius: 8px; 
          font-weight: 600; 
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0; font-size: 28px;">🌙 Sleep Harmony</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Merci pour votre intérêt !</p>
      </div>
      
      <div class="content">
        <h2>Bonjour ${firstName} ! 👋</h2>
        
        <p>Merci d'avoir manifesté votre intérêt pour Sleep Harmony.</p>
        
        <div class="highlight">
          <h3 style="margin-top: 0;">📧 Votre accès arrive bientôt</h3>
          <p>Nous préparons votre accès personnalisé à Sleep Harmony. Vous recevrez un nouvel email dans les prochaines heures avec :</p>
          <ul>
            <li>Votre lien d'accès à l'application</li>
            <li>Vos premiers conseils personnalisés</li>
            <li>Un guide de démarrage rapide</li>
          </ul>
        </div>
        
        <p><strong>En attendant :</strong> Ajoutez <code>contact@sleepharmony.fr</code> à vos contacts pour être sûr(e) de recevoir tous nos emails.</p>
        
        <p>Vous avez des questions ? Répondez simplement à cet email, nous vous répondrons personnellement.</p>
        
        <p>À très bientôt,<br>
        <strong>L'équipe Sleep Harmony</strong> 💙</p>
      </div>
      
      <div class="footer">
        <p style="margin: 0; font-size: 14px; color: #6b7280;">
          Sleep Harmony - L'application qui aide les couples à retrouver leur complicité après bébé<br>
          <a href="mailto:contact@sleepharmony.fr" style="color: #3B82F6;">contact@sleepharmony.fr</a>
        </p>
      </div>
    </body>
    </html>
  `
}

// Fonction fictive pour l'envoi d'email - à remplacer par votre service d'email
async function sendEmail(emailData: {
  to: string
  subject: string
  html: string
  from: string
}) {
  // Ici vous intégreriez votre service d'email (SendGrid, Mailgun, etc.)
  // Pour l'exemple, nous simulons un envoi réussi
  console.log('Envoi email à:', emailData.to)
  console.log('Sujet:', emailData.subject)
  
  // Simulation d'un délai d'envoi
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    id: `email_${Date.now()}`,
    status: 'sent'
  }
}