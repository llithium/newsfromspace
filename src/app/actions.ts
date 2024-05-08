"use server";

import { redirect } from "next/navigation";
import { createClient } from "./utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function signOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/login");
}
