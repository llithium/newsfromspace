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

export async function addBookmark(
  bookmarkRoute: string,
  bookmarkId: string,
): Promise<boolean> {
  const supabase = createClient();
  const { data: userData, error: getUserError } = await supabase.auth.getUser();
  if (!getUserError) {
    const { data, error } = await supabase.from("bookmarks").insert([
      {
        type: bookmarkRoute.slice(0, -1),
        item_id: bookmarkId,
        user_id: userData.user?.id,
      },
    ]);
    // .select();
    if (!error) {
      revalidatePath("/");
      return true;
    } else console.log(error);
    return false;
  } else {
    console.log(getUserError);
    return false;
  }
}

export async function deleteBookmark(
  bookmarkRoute: string,
  bookmarkId: string,
): Promise<boolean> {
  const supabase = createClient();
  const { data: userData, error: getUserError } = await supabase.auth.getUser();
  if (!getUserError) {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", userData.user?.id)
      .eq("type", bookmarkRoute.slice(0, -1))
      .eq("item_id", bookmarkId);
    if (!error) {
      revalidatePath("/");
      return true;
    } else console.log(error);
    return false;
  } else {
    console.log(getUserError);
    return false;
  }
}

export async function checkBookmark(
  bookmarkRoute: string,
  bookmarkId: string,
): Promise<boolean> {
  const supabase = createClient();
  const { data: userData, error: getUserError } = await supabase.auth.getUser();
  if (!getUserError) {
    let { data: bookmarks, error: getBookmarksError } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userData.user?.id)
      .eq("type", bookmarkRoute.slice(0, -1))
      .eq("item_id", bookmarkId);
    if (!getBookmarksError) {
      if (bookmarks) {
        if (bookmarks.length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      console.log(getBookmarksError);
      return false;
    }
  } else {
    console.log(getUserError);
    return false;
  }
}
