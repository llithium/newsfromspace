"use client";
import { Input } from "@nextui-org/input";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("q");
  const search = (formData: FormData) => {
    switch (pathname) {
      case "/articles":
        router.push(`/articles/?q=${formData.get("search")}`);
        break;
      case "/blogs":
        router.push(`/blogs/?q=${formData.get("search")}`);
        break;
      case "/launches":
        router.push(`/launches/?q=${formData.get("search")}`);
        break;
      case "/launches/past":
        router.push(`/launches/past/?q=${formData.get("search")}`);
        break;
      default:
        break;
    }
  };
  return (
    <form className="w-full" action={search}>
      <Input
        className="w-full"
        name="search"
        classNames={{
          base: "w-full h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder={
          searchParams && searchValue ? searchValue : "Type to search..."
        }
        size="sm"
        startContent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.096 5.904a6.5 6.5 0 1 0-9.192 9.192a6.5 6.5 0 0 0 9.192-9.192M4.49 4.49a8.5 8.5 0 0 1 12.686 11.272l5.345 5.345l-1.414 1.414l-5.345-5.345A8.501 8.501 0 0 1 4.49 4.49"
            />
          </svg>
        }
        type="search"
      />
    </form>
  );
};

export default SearchInput;
