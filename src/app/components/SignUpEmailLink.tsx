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

const SignUpEmailLink = () => {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  async function handleSignUp(formData: FormData) {
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
        formAction={handleSignUp}
      >
        Sign up
      </Button>
      <Link
        className="transition-opacity hover:opacity-80 active:opacity-disabled"
        href="/login"
      >
        <p className="text-sm ">Already have an account? Log In</p>
      </Link>
    </form>
  );
};

export default SignUpEmailLink;
