"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

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
    console.log(error);
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
    console.log(error);
  }
}

const emailSchema = z
  .string()
  .email({ message: "Invalid Email" })
  .toLowerCase()
  .max(128, { message: "Email cannot exceed 128 characters" });
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be 8 or more characters long" })
  .max(128, { message: "Password cannot exceed 128 characters" });

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
  console.log(passwordResult);

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
    redirect("/");
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
    redirect("/");
  }
}
