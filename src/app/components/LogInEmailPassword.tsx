"use client";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { login } from "@/login/actions";
import { z } from "zod";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";
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

const LoginEmailPassword = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  async function handlelogin(formData: FormData) {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
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
      const loginError = await login(formData);
      if (loginError) {
        setPasswordErrorMessage(loginError);
        setPasswordIsInvalid(true);
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
        formAction={handlelogin}
      >
        Log in
      </Button>
      <p className="text-sm opacity-60">Forgot your password?</p>
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
