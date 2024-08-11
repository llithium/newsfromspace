"use client";

import { resetPassword } from "@/app/actions";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { z } from "zod";

const emailSchema = z
  .string()
  .email({ message: "Invalid Email" })
  .toLowerCase()
  .max(128, { message: "Email cannot exceed 128 characters" });

const ResetPassword = () => {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleResetPassword(formData: FormData) {
    setIsLoading(true);
    const emailResult = emailSchema.safeParse(formData.get("email"));
    if (!emailResult.success) {
      setEmailErrorMessage(emailResult.error.message);
      setEmailIsInvalid(true);
      setIsLoading(false);
    }

    if (emailResult.success) {
      const error = await resetPassword(formData);
      if (error) {
        setEmailIsInvalid(true);
        setEmailErrorMessage(error);
        setIsLoading(false);
      }
    }
  }

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleResetPassword(new FormData(e.currentTarget));
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
        className="h-14 w-full text-lg"
        type="submit"
        isLoading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? "Resetting Password..." : "Reset Password"}
      </Button>
    </form>
  );
};

export default ResetPassword;
