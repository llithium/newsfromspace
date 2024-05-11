import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SignUpPage from "./components/SignUpPage";

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    redirect("/account");
  }
  return <SignUpPage />;
}
