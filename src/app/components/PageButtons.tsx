"use client";
import { pageLimit } from "@/utils/variables";
import { Pagination } from "@nextui-org/pagination";
import { usePathname, useRouter } from "next/navigation";

const PageButtons = ({
  count,
  page,
  search,
}: {
  count: number;
  page: number;
  search?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Pagination
      size="sm"
      color="default"
      showControls
      total={Math.ceil(count / parseInt(pageLimit))}
      initialPage={page}
      onChange={(page) => {
        !search
          ? router.push(`${pathname}?page=${page}`)
          : router.push(`${pathname}?q=${search}&page=${page}`);
      }}
    />
  );
};

export default PageButtons;
