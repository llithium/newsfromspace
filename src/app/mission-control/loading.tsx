import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <main className="wrap">
      <Spinner
        color="current"
        className="my-40 w-full"
        label="Establishing telemetry…"
      />
    </main>
  );
}
