import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SignUpPage from "./components/SignUpPage";

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect("/account");
  }
  return <SignUpPage />;
}
