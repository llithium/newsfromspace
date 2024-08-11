"use client";
import { Button } from "@nextui-org/button";

import { useState } from "react";
import { EyeSlashFilledIcon } from "src/components/ui/EyeSlashFilledIcon";
import Link from "next/link";
import { z } from "zod";
import { Input } from "@nextui-org/input";
import { EyeFilledIcon } from "@/components/ui/EyeFilledIcon";
import { signupWithPassword } from "../actions";

const emailSchema = z
  .string()
  .email({ message: "Invalid Email" })
  .toLowerCase()
  .max(128, { message: "Email cannot exceed 128 characters" });
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be 8 or more characters long" })
  .max(128, { message: "Password cannot exceed 128 characters" });

const SignUpEmailPassword = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [inProgress, setInProgress] = useState(false);

  async function handleSignUp(formData: FormData) {
    setInProgress(true);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const emailResult = emailSchema.safeParse(data.email);
    if (!emailResult.success) {
      setEmailErrorMessage(emailResult.error.issues[0].message);
      setEmailIsInvalid(true);
      setInProgress(false);
    }
    const passwordResult = passwordSchema.safeParse(data.password);
    if (!passwordResult.success) {
      setPasswordErrorMessage(passwordResult.error.issues[0].message);
      setPasswordIsInvalid(true);
      setInProgress(false);
    }
    if (emailResult.success && passwordResult.success) {
      const signUpError = await signupWithPassword(formData);
      if (signUpError) {
        setInProgress(false);
        if (signUpError === "User already exists") {
          setEmailErrorMessage(signUpError);
          setEmailIsInvalid(true);
        } else {
          setPasswordErrorMessage(signUpError);
          setPasswordIsInvalid(true);
          setEmailErrorMessage(signUpError);
          setEmailIsInvalid(true);
        }
      }
    } else {
      return;
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

      <Input
        isRequired
        isInvalid={passwordIsInvalid}
        errorMessage={passwordErrorMessage}
        onValueChange={() => [setPasswordIsInvalid(false)]}
        label="Password"
        id="password"
        name="password"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
            ) : (
              <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
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

export default SignUpEmailPassword;
