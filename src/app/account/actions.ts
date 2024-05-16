"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function deleteUser() {
  const supabase = createClient();
  const { data, error: getUserError } = await supabase.auth.getUser();
  if (getUserError || !data?.user) {
    redirect("/");
  }

  const { error } = await supabase.rpc("delete_user");
  if (error) {
    throw new Error(error.message);
  }
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/");
}
