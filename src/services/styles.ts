import { supabase } from "@/integrations/supabase/client";

export const getActiveStyles = () =>
  supabase
    .from("styles")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
