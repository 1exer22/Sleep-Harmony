import { supabase } from '../lib/supabase';
import type { User, Qualification, EmailSubscription } from '../lib/supabase';

export interface QualificationFormData {
  babyAge: string;
  relationDuration: string;
  relationStatus: string;
  mainChallenges: string[];
  urgencyLevel: string;
  motivation: string;
  firstName: string;
  email: string;
  acceptsEmails: boolean;
}

export interface EmailSignupData {
  email: string;
}

// Créer un utilisateur et sa qualification
export async function createUserWithQualification(formData: QualificationFormData) {
  try {
    // Call the register-user Edge Function
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/register-user`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        firstName: formData.firstName,
        babyAge: formData.babyAge,
        relationDuration: formData.relationDuration,
        relationStatus: formData.relationStatus,
        mainChallenges: formData.mainChallenges,
        urgencyLevel: formData.urgencyLevel,
        motivation: formData.motivation,
        acceptsEmails: formData.acceptsEmails,
        isQualificationComplete: true
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }

    const result = await response.json();
    const { user, qualification } = result;

    return {
      user,
      qualification,
      success: true
    };

  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    return {
      user: null,
      qualification: null,
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}

// Inscription simple par email (pour le formulaire de la landing page)
export async function createEmailSignup(data: EmailSignupData) {
  try {
    console.log('Tentative d\'inscription avec:', data);
    
    // Call the register-user Edge Function
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/register-user`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        acceptsEmails: true,
        isQualificationComplete: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }

    const result = await response.json();
    console.log('Inscription réussie');
    return {
      success: true,
      message: 'Inscription réussie',
      user: result.user
    };

  } catch (error) {
    console.error('Erreur lors de l\'inscription email:', error);
    
    // Retourner des détails d'erreur plus spécifiques
    let errorMessage = 'Erreur inconnue';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null) {
      // Erreur Supabase
      const supabaseError = error as any;
      if (supabaseError.code) {
        switch (supabaseError.code) {
          case '23505':
            errorMessage = 'Cette adresse email est déjà utilisée';
            break;
          case 'PGRST116':
            errorMessage = 'Problème de connexion à la base de données';
            break;
          default:
            errorMessage = `Erreur de base de données: ${supabaseError.message || supabaseError.code}`;
        }
      } else {
        errorMessage = supabaseError.message || 'Erreur de service';
      }
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

// Fonction pour envoyer l'email de bienvenue
async function sendWelcomeEmail(emailData: {
  to: string
  firstName: string
  isQualificationComplete: boolean
}) {
  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-welcome-email`;
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData)
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return await response.json();
}

// Récupérer un utilisateur par email
export async function getUserByEmail(email: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        qualifications (*),
        email_subscriptions (*)
      `)
      .eq('email', email)
      .single();

    if (error) throw error;

    return {
      success: true,
      user: data
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Utilisateur non trouvé'
    };
  }
}

// Mettre à jour le statut d'abonnement
export async function updateSubscriptionStatus(
  userId: string, 
  status: User['subscription_status']
) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ 
        subscription_status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      user: data
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur de mise à jour'
    };
  }
}