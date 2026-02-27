import { supabase } from "@/integrations/supabase/client";

export const getProfile = (userId: string) =>
  supabase.from("profiles").select("*").eq("user_id", userId).single();

export const updateProfile = (
  userId: string,
  data: { display_name?: string; avatar_url?: string },
) =>
  supabase
    .from("profiles")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("user_id", userId)
    .select()
    .single();
