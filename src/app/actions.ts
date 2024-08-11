"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";
import { z } from "zod";
import { getURL } from "@/lib/utils";

const login = {
  password: loginWithPassword,
  link: loginWithLink,
  google: oauthGoogle,
  discord: oauthDiscord,
  x: oauthX,
};

const email = {
  change: changeEmail,
  update: updatePassword,
};

const password = {
  reset: resetPassword,
  update: updatePassword,
};

const signup = {
  password: signupWithPassword,
  link: loginWithLink,
  google: oauthGoogle,
  discord: oauthDiscord,
  x: oauthX,
};

export const account = {
  login: login,
  logout: logout,
  signup: signup,
  email: email,
  password: password,
};

const emailSchema = z
  .string()
  .email({ message: "Invalid Email" })
  .toLowerCase()
  .max(128, { message: "Email cannot exceed 128 characters" });
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be 8 or more characters long" })
  .max(128, { message: "Password cannot exceed 128 characters" });

async function oauthGoogle() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: getURL(),
    },
  });

  if (!error) {
    if (data.url) {
      redirect(data.url); // use the redirect API for your server framework
    }
  } else {
    throw new Error(error.message);
  }
}

async function oauthX() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: { redirectTo: getURL() },
  });

  if (!error) {
    if (data.url) {
      redirect(data.url); // use the redirect API for your server framework
    }
  } else {
    throw new Error(error.message);
  }
}

async function oauthDiscord() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: { redirectTo: getURL() },
  });

  if (!error) {
    if (data.url) {
      redirect(data.url); // use the redirect API for your server framework
    }
  } else {
    throw new Error(error.message);
  }
}

async function loginWithPassword(formData: FormData) {
  const supabase = createClient();

  const emailResult = emailSchema.safeParse(formData.get("email"));
  if (!emailResult.success) {
    throw new Error(emailResult.error.message);
  }
  const passwordResult = passwordSchema.safeParse(formData.get("password"));
  if (!passwordResult.success) {
    throw new Error(passwordResult.error.message);
  }

  if (emailResult.success && passwordResult.success) {
    const data = {
      email: emailResult.data,
      password: passwordResult.data,
    };
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) {
      return error.message;
    }
    revalidatePath("/", "layout");
    redirect("/");
  }
}

async function loginWithLink(formData: FormData) {
  const supabase = createClient();

  const emailResult = emailSchema.safeParse(formData.get("email"));
  if (!emailResult.success) {
    throw new Error(emailResult.error.message);
  }
  const { error } = await supabase.auth.signInWithOtp({
    email: emailResult.data,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      // shouldCreateUser: false,
      // emailRedirectTo: "https://example.com/welcome",
      emailRedirectTo: getURL(),
    },
  });
  if (!error) {
    revalidatePath("/", "layout");
    redirect("/login/confirm");
  } else {
    return error.message;
  }
}

async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/");
  redirect("/login");
}

async function changeEmail(formData: FormData) {
  const supabase = createClient();
  const emailResult = emailSchema.safeParse(formData.get("email"));

  if (!emailResult.success) {
    throw new Error(emailResult.error.message);
  }

  const { data } = await supabase.auth.getUser();
  if (data.user?.email === formData.get("email")) {
    return `Your account's Email is already set to ${data.user.email}`;
  }

  const { error } = await supabase.auth.updateUser({
    email: emailResult.data,
  });
  if (!error) {
    redirect("/account/email/confirm");
  } else {
    return error.message;
  }
}

async function resetPassword(formData: FormData) {
  const supabase = createClient();

  const emailResult = emailSchema.safeParse(formData.get("email"));
  if (!emailResult.success) {
    throw new Error(emailResult.error.message);
  }

  const { error } = await supabase.auth.resetPasswordForEmail(
    emailResult.data,
    {
      redirectTo: `${getURL()}account/reset`,
    },
  );
  if (!error) {
    redirect("/login/reset/confirm");
  } else {
    return error.message;
  }
}

async function updatePassword(formData: FormData) {
  const supabase = createClient();
  const passwordResult = passwordSchema.safeParse(formData.get("password"));

  if (!passwordResult.success) {
    throw new Error(passwordResult.error.message);
  }

  const { error } = await supabase.auth.updateUser({
    password: passwordResult.data,
  });

  if (!error) {
    redirect("/account/");
  } else {
    return error.message;
  }
}
async function signupWithPassword(formData: FormData) {
  const supabase = createClient();

  const emailResult = emailSchema.safeParse(formData.get("email"));
  if (!emailResult.success) {
    throw new Error(emailResult.error.message);
  }
  const passwordResult = passwordSchema.safeParse(formData.get("password"));
  if (!passwordResult.success) {
    throw new Error(passwordResult.error.message);
  }

  if (emailResult.success && passwordResult.success) {
    const data = {
      email: emailResult.data,
      password: passwordResult.data,
    };
    const { data: user, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: getURL(),
      },
    });
    if (error) {
      return error.message;
    }
    if (user.user?.identities?.length == 0) {
      return "User already exists";
    }

    revalidatePath("/", "layout");
    redirect("/signup/confirm");
  }
}

async function addBookmark(
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

async function deleteBookmark(
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

async function checkBookmark(
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

export const bookmark = {
  add: addBookmark,
  delete: deleteBookmark,
  check: checkBookmark,
};

export async function deleteUser() {
  const supabase = createClient();
  const { data, error: getUserError } = await supabase.auth.getUser();
  if (getUserError || !data?.user) {
    redirect("/");
  }

  const { error } = await supabase.rpc("delete_user");
  if (error) {
    throw new Error(error.message);
  }
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/");
}
