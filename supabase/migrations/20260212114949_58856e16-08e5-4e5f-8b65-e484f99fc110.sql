
-- Fix: restrict audit log inserts to authenticated users only
DROP POLICY "Service role can insert audit log" ON public.audit_log;
CREATE POLICY "Authenticated can insert audit log" ON public.audit_log FOR INSERT TO authenticated WITH CHECK (true);
