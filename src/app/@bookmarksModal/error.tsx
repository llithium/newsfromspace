"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="modalWrapper fixed inset-0 z-50 flex h-dvh w-screen flex-col items-center justify-center"
      onClick={() => router.back()}
    >
      <div
        className="modal max-h-4/5 relative top-6 mx-auto h-4/5 w-10/12 rounded-lg bg-background p-2 shadow-md sm:w-3/4 md:h-3/5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto flex h-full w-fit flex-col items-center justify-center gap-2">
          <h2 className="text-xl font-bold">Something went wrong!</h2>
          <Button color="default" onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
