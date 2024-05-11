import { createClient } from "@/utils/supabase/server";
import LoginPage from "./components/LoginPage";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    redirect("/account");
  }
  return <LoginPage />;
}
