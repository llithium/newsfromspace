"use client";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { login, signup } from "./actions";
import { useState } from "react";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="mx-auto w-fit">
      <Card className="w-[400px] py-1">
        {/* OAuth logins */}
        {/* <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">NextUI</p>
            <p className="text-small text-default-500">nextui.org</p>
          </div>
        </CardHeader>
        <Divider /> */}
        <CardBody>
          <form className="flex flex-col items-center gap-4">
            <Input
              isRequired
              id="email"
              name="email"
              type="email"
              label="Email"
              className=""
            />

            <Input
              isRequired
              label="Password"
              id="password"
              name="password"
              placeholder="Enter your password"
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
              formAction={login}
            >
              Log in
            </Button>
            <button formAction={signup}>Sign up</button>
            {/* <p className="text-sm opacity-60">Forgot your password?</p> */}
            {/* <p className="text-sm opacity-60">Don't have an account? Sign Up</p> */}
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
