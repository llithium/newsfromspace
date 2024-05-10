"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";

import { useState } from "react";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { z } from "zod";
import { login, oauthGoogle, signup } from "@/login/actions";
import Link from "next/link";

const emailSchema = z
  .string()
  .email({ message: "Invalid Email" })
  .toLowerCase()
  .max(128, { message: "Email cannot exceed 128 characters" });
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be 8 or more characters long" })
  .max(128, { message: "Password cannot exceed 128 characters" });

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  async function handleSignUp(formData: FormData) {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const emailResult = emailSchema.safeParse(data.email);
    if (!emailResult.success) {
      setEmailErrorMessage(emailResult.error.issues[0].message);
      setEmailIsInvalid(true);
    }
    const passwordResult = passwordSchema.safeParse(data.password);
    if (!passwordResult.success) {
      setPasswordErrorMessage(passwordResult.error.issues[0].message);
      setPasswordIsInvalid(true);
    }
    if (emailResult.success && passwordResult.success) {
      const signUpError = await signup(formData);
      if (signUpError) {
        setPasswordErrorMessage(signUpError);
        setPasswordIsInvalid(true);
        setEmailErrorMessage(signUpError);
        setEmailIsInvalid(true);
      }
    } else {
      return;
    }
  }
  return (
    <div className="mx-auto w-fit">
      <Card className="w-[400px] py-1">
        {/* OAuth logins */}
        <CardHeader className="flex gap-3">
          <Button
            name="google"
            className="h-16 w-16"
            isIconOnly
            variant="faded"
            aria-label="Google"
            onPress={() => {
              oauthGoogle();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4em"
              height="4em"
              viewBox="0 0 48 48"
            >
              <path
                fill="#ffc107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
              />
              <path
                fill="#ff3d00"
                d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
              />
              <path
                fill="#4caf50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
              />
              <path
                fill="#1976d2"
                d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
              />
            </svg>
          </Button>
        </CardHeader>
        <Divider />
        <CardBody>
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
              className="h-14 w-full"
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
        </CardBody>
      </Card>
    </div>
  );
}
