export default function ErrorPage() {
  return (
    <div className="fixed inset-0 h-svh w-screen ">
      <div className="mx-auto flex h-full w-fit flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold md:text-5xl">
          Sorry, something went wrong
        </h2>
      </div>
    </div>
  );
}
