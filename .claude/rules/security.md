---
glob: "supabase/**/*"
---

# Security Rules for Supabase

- All tables must have RLS enabled
- Never expose service_role key to the client
- Edge Functions: validate JWT from Authorization header
- Edge Functions: use `createClient` with service_role key only in server context
- Stripe webhooks: always verify stripe-signature header
- Never trust client-submitted credit_balance values
- Credit operations must be atomic (use transactions or service_role)
- Audit log all sensitive operations
- Input validation on all edge function parameters
- CORS headers: restrict to known origins in production
