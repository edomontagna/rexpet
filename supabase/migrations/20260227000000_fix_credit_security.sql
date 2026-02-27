-- Fix: Prevent clients from updating credit_balance directly
-- Only service_role should modify credit_balance

-- Drop existing UPDATE policy on profiles if it allows credit_balance changes
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create new UPDATE policy that excludes credit_balance
CREATE POLICY "Users can update own profile (no credits)"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND credit_balance = (SELECT credit_balance FROM profiles WHERE user_id = auth.uid())
  );

-- Fix audit_log INSERT policy: only service_role should insert
DROP POLICY IF EXISTS "Users can insert audit logs" ON audit_log;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON audit_log;

-- Allow authenticated users to insert their own audit logs (for account_deleted event)
CREATE POLICY "Users can insert own audit logs"
  ON audit_log
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Ensure audit_log is not readable by regular users
DROP POLICY IF EXISTS "Users can read own audit logs" ON audit_log;
