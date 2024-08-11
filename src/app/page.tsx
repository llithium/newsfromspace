import HomePage, { BookmarkData } from "./HomePage";
import { createClient } from "./utils/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return <HomePage bookmarks={null} />;
  } else {
    let { data: bookmarks } = await supabase
      .from("bookmarks")
      .select("*")
      .range(0, 6)
      .eq("user_id", data.user?.id);
    if (bookmarks?.length == 0) {
      return <HomePage bookmarks={null} />;
    } else {
      return <HomePage bookmarks={bookmarks as BookmarkData[]} />;
    }
  }
}
