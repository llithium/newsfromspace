"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
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
  const [inProgress, setInProgress] = useState(false);

  async function handleLogin(formData: FormData) {
    setInProgress(true);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const emailResult = emailSchema.safeParse(data.email);
    if (!emailResult.success) {
      setEmailErrorMessage(emailResult.error.issues[0].message);
      setEmailIsInvalid(true);
      setInProgress(false);
    }

    if (emailResult.success) {
      const error = await signInWithEmailLink(formData);
      if (error) {
        setEmailErrorMessage(error);
        setEmailIsInvalid(true);
        setInProgress(false);
      }
    }
  }

  return (
    <form
      className="flex w-full flex-col items-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(new FormData(e.currentTarget));
      }}
    >
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
        isLoading={inProgress}
        disabled={inProgress}
      >
        {inProgress ? "Logging in..." : "Log in"}
      </Button>
      {/* <p className="text-sm opacity-60">Forgot your password?</p> */}
      <Link
        className="transition-opacity hover:opacity-80 active:opacity-disabled"
        href="/signup"
      >
        <p className="text-sm">{"Don't have an account? Sign Up"}</p>
      </Link>
    </form>
  );
};

export default LogInEmailLink;
