"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { account } from "@/app/actions";

const emailSchema = z
  .string()
  .email({ message: "Invalid Email" })
  .toLowerCase()
  .max(128, { message: "Email cannot exceed 128 characters" });

const SignUpEmailLink = () => {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [inProgress, setInProgress] = useState(false);

  async function handleSignUp(formData: FormData) {
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
      const error = await account.signup.link(formData);
      if (error) {
        setEmailErrorMessage(error);
        setEmailIsInvalid(true);
        setInProgress(false);
      }
    }
  }

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSignUp(new FormData(e.currentTarget));
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
        {inProgress ? "Signing up..." : "Sign Up"}
      </Button>
      <Link
        className="transition-opacity hover:opacity-80 active:opacity-disabled"
        href="/login"
      >
        <p className="text-sm">Already have an account? Log In</p>
      </Link>
    </form>
  );
};

export default SignUpEmailLink;
