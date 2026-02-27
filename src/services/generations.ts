import { supabase } from "@/integrations/supabase/client";

export const getGenerations = (
  userId: string,
  page = 0,
  pageSize = 12,
) =>
  supabase
    .from("generated_images")
    .select("*, styles(name, preview_url)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1);

export const getGeneration = (id: string) =>
  supabase
    .from("generated_images")
    .select("*, styles(name, preview_url)")
    .eq("id", id)
    .single();

export const requestGeneration = async (
  originalId: string,
  styleId: string,
) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");

  const res = await supabase.functions.invoke("generate-portrait", {
    body: { original_id: originalId, style_id: styleId },
  });

  if (res.error) throw res.error;
  return res.data;
};

export const checkGenerationStatus = async (generationId: string) => {
  const res = await supabase.functions.invoke("check-generation-status", {
    body: { id: generationId },
  });
  if (res.error) throw res.error;
  return res.data;
};
