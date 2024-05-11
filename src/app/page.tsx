import HomePage from "./components/HomePage";
import LoggedInHomePage, { BookmarkData } from "./components/LoggedInHomePage";
import { createClient } from "./utils/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return <HomePage />;
  } else {
    let { data: bookmarks } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", data.user?.id);
    if (bookmarks?.length == 0) {
      return <HomePage />;
    } else {
      return <LoggedInHomePage bookmarks={bookmarks as BookmarkData[]} />;
    }
  }
}
