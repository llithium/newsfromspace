"use client";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { login } from "@/login/actions";
import Link from "next/link";
import { z } from "zod";

const emailSchema = z
  .string()
  .email({ message: "Invalid Email" })
  .toLowerCase()
  .max(128, { message: "Email cannot exceed 128 characters" });

const LoginEmailPassword = () => {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  async function handlelogin(formData: FormData) {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const emailResult = emailSchema.safeParse(data.email);
    if (!emailResult.success) {
      setEmailErrorMessage(emailResult.error.issues[0].message);
      setEmailIsInvalid(true);
    }

    if (emailResult.success) {
      const loginError = await login(formData);
      if (loginError) {
        setEmailErrorMessage(loginError);
        setEmailIsInvalid(true);
      }
    } else {
      return;
    }
  }

  return (
    <form className="flex flex-col items-center gap-4">
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
        formAction={handlelogin}
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

export default LoginEmailPassword;
