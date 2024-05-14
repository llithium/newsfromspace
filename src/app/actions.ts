"use server";

import { redirect } from "next/navigation";
import { createClient } from "./utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function signOutAction() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/");
  redirect("/login");
}

export async function addBookmark(
  bookmarkRoute: string,
  bookmarkId: string,
): Promise<string | null> {
  const supabase = createClient();
  const { data: userData, error: getUserError } = await supabase.auth.getUser();
  if (!getUserError) {
    const { error } = await supabase.from("bookmarks").insert([
      {
        type: bookmarkRoute.slice(0, -1),
        item_id: bookmarkId,
        user_id: userData.user.id,
      },
    ]);
    if (!error) {
      return null;
    }
    return error.message;
  } else {
    return getUserError.message;
  }
}

export async function deleteBookmark(
  bookmarkRoute: string,
  bookmarkId: string,
): Promise<string | null> {
  const supabase = createClient();
  const { data: userData, error: getUserError } = await supabase.auth.getUser();
  if (!getUserError) {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", userData.user.id)
      .eq("type", bookmarkRoute.slice(0, -1))
      .eq("item_id", bookmarkId);
    if (!error) {
      return null;
    }
    return error.message;
  } else {
    return getUserError.message;
  }
}

export async function checkBookmark(
  bookmarkRoute: string,
  bookmarkId: string,
): Promise<string | null> {
  const supabase = createClient();
  const { data: userData, error: getUserError } = await supabase.auth.getUser();
  if (!getUserError) {
    let { data: bookmarks, error: getBookmarksError } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userData.user.id)
      .eq("type", bookmarkRoute.slice(0, -1))
      .eq("item_id", bookmarkId);
    if (!getBookmarksError) {
      if (bookmarks) {
        if (bookmarks.length > 0) {
          return null;
        } else {
          return "No bookmarks";
        }
      } else {
        return "No bookmarks";
      }
    } else {
      return getBookmarksError.message;
    }
  } else {
    return getUserError.message;
  }
}
