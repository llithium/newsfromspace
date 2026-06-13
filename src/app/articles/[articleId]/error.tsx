"use client";
import { Button } from "@nextui-org/react";
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
    <main className="wrap">
      <div className="page-intro" style={{ borderBottom: "none" }}>
        <h1 style={{ fontSize: "clamp(32px,4vw,52px)" }}>
          Couldn&apos;t open this dispatch
        </h1>
        <p className="sub">{error.message}</p>
        <div style={{ marginTop: 18 }}>
          <Button radius="none" className="btn accent" onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </main>
  );
}
