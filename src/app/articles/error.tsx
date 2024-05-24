"use client";
import { Button } from "@nextui-org/button";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 h-svh w-screen ">
      <div className="mx-auto flex h-full w-fit flex-col items-center justify-center gap-2">
        <h2 className="text-xl font-bold">Something went wrong!</h2>
        <p>{error.message}</p>
        <Button color="default" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
