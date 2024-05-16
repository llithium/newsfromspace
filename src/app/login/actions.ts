"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import getURL from "@/utils/getURL";

const emailSchema = z
  .string()
  .email({ message: "Invalid Email" })
  .toLowerCase()
  .max(128, { message: "Email cannot exceed 128 characters" });
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be 8 or more characters long" })
  .max(128, { message: "Password cannot exceed 128 characters" });

export async function signInWithEmailLink(formData: FormData) {
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

export async function changeEmail(formData: FormData) {
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

export async function resetPassword(formData: FormData) {
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

export async function updatePassword(formData: FormData) {
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

export async function oauthGoogle() {
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

export async function oauthX() {
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

export async function oauthDiscord() {
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

export async function login(formData: FormData) {
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
    redirect("/signup/confirm");
  }
}

export async function signup(formData: FormData) {
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
