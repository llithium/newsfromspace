"use client";
import { Button, Input } from "@nextui-org/react";

import { useState } from "react";
import { signInWithEmailLink } from "@/login/actions";
import Link from "next/link";
import { z } from "zod";

const emailSchema = z
  .string()
  .email({ message: "Invalid Email" })
  .toLowerCase()
  .max(128, { message: "Email cannot exceed 128 characters" });

const LogInEmailLink = () => {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  async function handleLogin(formData: FormData) {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const emailResult = emailSchema.safeParse(data.email);
    if (!emailResult.success) {
      setEmailErrorMessage(emailResult.error.issues[0].message);
      setEmailIsInvalid(true);
    }

    if (emailResult.success) {
      const error = await signInWithEmailLink(formData);
      if (error) {
        setEmailErrorMessage(error);
        setEmailIsInvalid(true);
      }
    }
  }

  return (
    <form className="flex w-full flex-col items-center gap-4">
      <Input
        isRequired
        isInvalid={emailIsInvalid}
        errorMessage={emailErrorMessage}
        onValueChange={() => [setEmailIsInvalid(false)]}
        id="email"
        name="email"
        type="email"
        label="Email"
        className=""
      />

      <Button
        color="primary"
        className="h-14 w-full text-xl"
        type="submit"
        formAction={handleLogin}
      >
        Log in
      </Button>
      {/* <p className="text-sm opacity-60">Forgot your password?</p> */}
      <Link
        className="transition-opacity hover:opacity-80 active:opacity-disabled"
        href="/signup"
      >
        <p className="text-sm ">{"Don't have an account? Sign Up"}</p>
      </Link>
    </form>
  );
};

export default LogInEmailLink;