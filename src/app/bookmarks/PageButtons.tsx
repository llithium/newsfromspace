"use client";
import { pageLimit } from "@/articles/page";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const PageButtons = ({ count }: { count: number }) => {
  const router = useRouter();
  return (
    <Pagination
      size="lg"
      isCompact
      showControls
      total={Math.ceil(count / parseInt(pageLimit))}
      initialPage={1}
      onChange={(page) => {
        router.push(`/bookmarks/?page=${page}`);
      }}
    />
  );
};

export default PageButtons;
