import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set up your Supabase connection.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour TypeScript
export interface User {
  id: string;
  email: string;
  first_name: string;
  created_at: string;
  updated_at: string;
  subscription_status: 'trial' | 'active' | 'cancelled' | 'expired';
  trial_ends_at: string;
}

export interface Qualification {
  id: string;
  user_id: string;
  baby_age: string;
  relation_duration: string;
  relation_status: string;
  main_challenges: string[];
  urgency_level: string;
  motivation: string;
  created_at: string;
}

export interface EmailSubscription {
  id: string;
  user_id: string;
  email: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
}