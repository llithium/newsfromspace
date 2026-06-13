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
        <div className="kicker">
          <span className="bar" style={{ maxWidth: 40 }}></span>Telemetry lost
        </div>
        <h1 style={{ fontSize: "clamp(32px,4vw,52px)" }}>Something went wrong</h1>
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
