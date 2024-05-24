import { Spinner } from "@nextui-org/spinner";
const InfiniteScrollSpinner = () => {
  return (
    <div className="fixed inset-0 flex h-svh w-screen items-end justify-center sm:h-screen">
      <Spinner
        color="current"
        className="relative bottom-10 z-50"
        classNames={{
          wrapper: "h-24 w-24",
        }}
        size="lg"
        // label="Loading..."
      />
    </div>
  );
};

export default InfiniteScrollSpinner;
