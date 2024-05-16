"use client";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { z } from "zod";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { updatePassword } from "@/login/actions";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be 8 or more characters long" })
  .max(128, { message: "Password cannot exceed 128 characters" });

const UpdateAccountPassword = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  async function handleUpdatePassword(formData: FormData) {
    const passwordResult = passwordSchema.safeParse(formData.get("password"));
    if (!passwordResult.success) {
      setPasswordErrorMessage(passwordResult.error.issues[0].message);
      setPasswordIsInvalid(true);
    }
    if (passwordResult.success) {
      const updatePasswordError = await updatePassword(formData);
      if (updatePasswordError) {
        setPasswordErrorMessage(updatePasswordError);
        setPasswordIsInvalid(true);
      }
    } else {
      return;
    }
  }

  return (
    <form className="flex flex-col items-center gap-4">
      <Input
        isRequired
        isInvalid={passwordIsInvalid}
        errorMessage={passwordErrorMessage}
        onValueChange={() => [setPasswordIsInvalid(false)]}
        label="New Password"
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
        className="h-14 w-full text-lg"
        type="submit"
        formAction={handleUpdatePassword}
      >
        Update Password
      </Button>
    </form>
  );
};

export default UpdateAccountPassword;
