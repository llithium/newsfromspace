import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
      <Spinner
        color="current"
        className="relative z-50"
        classNames={{
          wrapper: "w-44 h-44",
        }}
        size="lg"
        // label="Loading..."
      />
    </div>
  );
}
