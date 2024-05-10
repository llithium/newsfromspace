import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import DeleteAccountButton from "./components/DeleteAccountButton";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <p>Hello {data.user.email}</p>
      <DeleteAccountButton />
    </>
  );
}
