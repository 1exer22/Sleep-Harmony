/*
  # Allow anonymous user registration

  1. Security Changes
    - Add policy to allow anonymous users to create accounts
    - Allow anonymous users to create qualifications and email subscriptions
    - Maintain security for reading/updating data (only authenticated users can access their own data)

  2. Policy Updates
    - `users` table: Allow INSERT for anon role
    - `qualifications` table: Allow INSERT for anon role  
    - `email_subscriptions` table: Allow INSERT for anon role
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Anyone can insert users" ON users;
DROP POLICY IF EXISTS "Users can insert own qualifications" ON qualifications;
DROP POLICY IF EXISTS "Anyone can insert email subscriptions" ON email_subscriptions;

-- Allow anonymous users to register (create user accounts)
CREATE POLICY "Allow anonymous user registration"
  ON users
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read and update their own data
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

-- Allow anonymous users to create qualifications during registration
CREATE POLICY "Allow anonymous qualification creation"
  ON qualifications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read and update their own qualifications
CREATE POLICY "Users can read own qualifications"
  ON qualifications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own qualifications"
  ON qualifications
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Allow anonymous users to create email subscriptions
CREATE POLICY "Allow anonymous email subscription"
  ON email_subscriptions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read and update their own email subscriptions
CREATE POLICY "Users can read own email subscriptions"
  ON email_subscriptions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own email subscriptions"
  ON email_subscriptions
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());