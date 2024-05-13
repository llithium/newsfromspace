"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

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
  } else {
    const { error } = await supabase.auth.signInWithOtp({
      email: emailResult.data,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        // shouldCreateUser: false,
        // emailRedirectTo: "https://example.com/welcome",
      },
    });
    if (!error) {
      revalidatePath("/", "layout");
      redirect("/");
    } else {
      throw new Error(error.message);
    }
  }
}

export async function changeEmail(formData: FormData) {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  if (data.user?.email === formData.get("email")) {
    console.log("here");
    return `Your account Email is already set to ${data.user.email}`;
  }

  const emailResult = emailSchema.safeParse(formData.get("email"));
  if (!emailResult.success) {
    throw new Error(emailResult.error.message);
  } else {
    const { error } = await supabase.auth.updateUser({
      email: emailResult.data,
    });
    if (!error) {
      console.log(error);

      redirect("/account/email/confirm");
    } else {
      return error.message;
    }
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
    },
  });
  console.log(data.url);

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
  });
  console.log(data.url);

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
    console.log(emailResult.error.issues);
    redirect("/error");
  }
  const passwordResult = passwordSchema.safeParse(formData.get("password"));
  if (!passwordResult.success) {
    console.log(passwordResult.error.issues);
    redirect("/error");
  }

  if (emailResult.success && passwordResult.success) {
    const data = {
      email: emailResult.data,
      password: passwordResult.data,
    };
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) {
      console.log(error.message);
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
    console.log(emailResult.error.issues);
    redirect("/error");
  }
  const passwordResult = passwordSchema.safeParse(formData.get("password"));
  if (!passwordResult.success) {
    console.log(passwordResult.error.issues);
    redirect("/error");
  }

  if (emailResult.success && passwordResult.success) {
    const data = {
      email: emailResult.data,
      password: passwordResult.data,
    };
    const { data: user, error } = await supabase.auth.signUp(data);
    if (error) {
      console.log(error.message);
      return error.message;
    }
    if (user.user?.identities?.length == +0) {
      return "User already exists";
    }

    revalidatePath("/", "layout");
    redirect("/signup/confirm");
  }
}
