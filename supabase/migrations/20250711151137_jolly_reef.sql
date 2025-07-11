/*
  # Fix user registration policies

  1. Security Updates
    - Update RLS policy for users table to allow anonymous registration
    - Ensure email subscriptions can be created by anonymous users
    - Maintain security while allowing registration flow

  2. Changes
    - Modify "Anyone can insert users" policy to properly allow anonymous inserts
    - Update qualifications policy to work with anonymous users during registration
    - Update email subscriptions policy for anonymous users
*/

-- Drop existing policies that might be too restrictive
DROP POLICY IF EXISTS "Anyone can insert users" ON users;
DROP POLICY IF EXISTS "Users can insert own qualifications" ON qualifications;
DROP POLICY IF EXISTS "Anyone can insert email subscriptions" ON email_subscriptions;

-- Create new policy for user registration (allows anonymous users to register)
CREATE POLICY "Allow user registration"
  ON users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Keep existing policies for reading and updating
-- Users can read their own data
CREATE POLICY "Users can read own data" 
  ON users 
  FOR SELECT 
  TO authenticated 
  USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" 
  ON users 
  FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = id);

-- Update qualifications policies
CREATE POLICY "Allow qualification creation"
  ON qualifications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

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

-- Update email subscriptions policies
CREATE POLICY "Allow email subscription creation"
  ON email_subscriptions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

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