"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { resetPassword } from "@/login/actions";
import { z } from "zod";

const emailSchema = z
  .string()
  .email({ message: "Invalid Email" })
  .toLowerCase()
  .max(128, { message: "Email cannot exceed 128 characters" });

const ResetPassword = () => {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  async function handleResetPassword(formData: FormData) {
    const emailResult = emailSchema.safeParse(formData.get("email"));
    if (!emailResult.success) {
      setEmailErrorMessage(emailResult.error.message);
      setEmailIsInvalid(true);
    }

    if (emailResult.success) {
      const error = await resetPassword(formData);
      if (error) {
        setEmailIsInvalid(true);
        setEmailErrorMessage(error);
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
        className="h-14 w-full text-lg"
        type="submit"
        formAction={handleResetPassword}
      >
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPassword;
