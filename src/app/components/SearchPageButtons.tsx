"use client";
import { pageLimit } from "@/utils/variables";
import { Pagination } from "@nextui-org/pagination";
import { usePathname, useRouter } from "next/navigation";

const SearchPageButtons = ({
  count,
  search,
  page,
}: {
  count: number;
  search: string;
  page: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Pagination
      size="lg"
      isCompact
      showControls
      total={Math.ceil(count / parseInt(pageLimit))}
      initialPage={page}
      onChange={(page) => {
        router.push(`${pathname}?q=${search}&page=${page}`);
      }}
    />
  );
};

export default SearchPageButtons;
