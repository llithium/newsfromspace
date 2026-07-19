"use client";
import { pageLimit } from "src/lib/variables";
import { usePathname, useRouter } from "next/navigation";
import { buildPageUrl } from "@/lib/utils";

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
  const totalPages = Math.max(1, Math.ceil(count / parseInt(pageLimit)));

  const go = (p: number) => {
    router.push(buildPageUrl(pathname, p, search));
  };

  const atStart = page <= 1;
  const atEnd = page >= totalPages;

  return (
    <div className="flex items-center gap-4">
      <button
        className="btn ghost"
        disabled={atStart}
        onClick={() => go(page - 1)}
        style={{
          opacity: atStart ? 0.4 : 1,
          cursor: atStart ? "default" : "pointer",
        }}
      >
        ← Newer
      </button>
      <span className="tag">
        Page {page} of {totalPages}
      </span>
      <button
        className="btn ghost"
        disabled={atEnd}
        onClick={() => go(page + 1)}
        style={{
          opacity: atEnd ? 0.4 : 1,
          cursor: atEnd ? "default" : "pointer",
        }}
      >
        Older →
      </button>
    </div>
  );
};

export default PageButtons;
