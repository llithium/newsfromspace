import HomePage from "./components/HomePage";
import LoggedInHomePage from "./components/LoggedInHomePage";
import { createClient } from "./utils/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error || !data?.session) {
    return <HomePage />;
  } else {
    return <LoggedInHomePage />;
  }
}
