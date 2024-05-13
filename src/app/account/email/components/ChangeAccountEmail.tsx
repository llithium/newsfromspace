"use client";
import { Button, Input } from "@nextui-org/react";

import { useState } from "react";
import { changeEmail } from "@/login/actions";
import { z } from "zod";

const emailSchema = z
  .string()
  .email({ message: "Invalid Email" })
  .toLowerCase()
  .max(128, { message: "Email cannot exceed 128 characters" });

const ChangeAccountEmail = () => {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  async function handleChangeEmail(formData: FormData) {
    const emailResult = emailSchema.safeParse(formData.get("email"));
    if (!emailResult.success) {
      setEmailErrorMessage(emailResult.error.message);
      setEmailIsInvalid(true);
    }

    if (emailResult.success) {
      const error = await changeEmail(formData);
      if (error) {
        setEmailIsInvalid(true);
        setEmailErrorMessage(error);
        console.log(error);
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
        label="New Email"
        className=""
      />

      <Button
        color="primary"
        className="h-14 w-full text-lg"
        type="submit"
        formAction={handleChangeEmail}
      >
        Change Email
      </Button>
    </form>
  );
};

export default ChangeAccountEmail;
