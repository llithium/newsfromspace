import { createClient } from "@/utils/supabase/server";
import LoginPage from "./components/LoginPage";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect("/account");
  }
  return <LoginPage />;
}
