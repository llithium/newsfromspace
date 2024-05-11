"use client";
import { Button, Card, CardBody, Divider, Input } from "@nextui-org/react";

import { useState } from "react";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { z } from "zod";
import { signup } from "@/login/actions";
import Link from "next/link";
import OauthButtons from "@/components/OauthButtons";

const emailSchema = z
  .string()
  .email({ message: "Invalid Email" })
  .toLowerCase()
  .max(128, { message: "Email cannot exceed 128 characters" });
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be 8 or more characters long" })
  .max(128, { message: "Password cannot exceed 128 characters" });

export default function SignUpPage() {
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
    <div className="mx-auto flex w-5/6 flex-row justify-center">
      <Card className="w-full max-w-[400px] py-1">
        <OauthButtons />
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
