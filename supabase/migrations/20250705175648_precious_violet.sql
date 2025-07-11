/*
  # Création des tables utilisateurs et qualifications

  1. Nouvelles tables
    - `users`
      - `id` (uuid, clé primaire)
      - `email` (text, unique)
      - `first_name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `subscription_status` (text)
      - `trial_ends_at` (timestamp)
    
    - `qualifications`
      - `id` (uuid, clé primaire)
      - `user_id` (uuid, référence vers users)
      - `baby_age` (text)
      - `relation_duration` (text)
      - `relation_status` (text)
      - `main_challenges` (jsonb)
      - `urgency_level` (text)
      - `motivation` (text)
      - `created_at` (timestamp)

    - `email_subscriptions`
      - `id` (uuid, clé primaire)
      - `user_id` (uuid, référence vers users)
      - `email` (text)
      - `subscribed_at` (timestamp)
      - `unsubscribed_at` (timestamp)

  2. Sécurité
    - Activation RLS sur toutes les tables
    - Politiques pour que les utilisateurs ne voient que leurs propres données
    - Politique pour l'insertion des nouvelles données
*/

-- Création de la table users
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  subscription_status text DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'cancelled', 'expired')),
  trial_ends_at timestamptz DEFAULT (now() + interval '7 days')
);

-- Création de la table qualifications
CREATE TABLE IF NOT EXISTS qualifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  baby_age text NOT NULL,
  relation_duration text NOT NULL,
  relation_status text NOT NULL,
  main_challenges jsonb NOT NULL DEFAULT '[]',
  urgency_level text NOT NULL,
  motivation text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Création de la table email_subscriptions
CREATE TABLE IF NOT EXISTS email_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  email text NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz DEFAULT NULL
);

-- Activation de RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;

-- Politiques pour users
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can insert users"
  ON users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Politiques pour qualifications
CREATE POLICY "Users can read own qualifications"
  ON qualifications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own qualifications"
  ON qualifications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own qualifications"
  ON qualifications
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Politiques pour email_subscriptions
CREATE POLICY "Users can read own email subscriptions"
  ON email_subscriptions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Anyone can insert email subscriptions"
  ON email_subscriptions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own email subscriptions"
  ON email_subscriptions
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour users
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_qualifications_user_id ON qualifications(user_id);
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_user_id ON email_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_email ON email_subscriptions(email);