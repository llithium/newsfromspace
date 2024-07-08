"use client";
import { pageLimit } from "@/utils/variables";
import { Pagination } from "@nextui-org/pagination";
import { usePathname, useRouter } from "next/navigation";

const PageButtons = ({ count, page }: { count: number; page: number }) => {
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
        router.push(`${pathname}?page=${page}`);
      }}
    />
  );
};

export default PageButtons;
