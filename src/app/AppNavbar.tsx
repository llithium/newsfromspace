"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwitcher";
import SearchInput from "./SearchInput";

const PAGES = [
  { key: "articles", label: "Articles", href: "/articles" },
  { key: "launches", label: "Launches", href: "/launches", has: true },
  {
    key: "mission",
    label: "Mission Control",
    href: "/mission-control",
    mission: true,
  },
  { key: "blogs", label: "Blogs", href: "/blogs" },
];

const SEARCHABLE = ["/articles", "/blogs", "/launches", "/launches/past"];

export default function AppNavbar() {
  const pathname = usePathname();
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

  const isActive = (key: string) =>
    key === "mission"
      ? pathname.startsWith("/mission-control")
      : pathname.startsWith(`/${key}`);

  const showSearch = SEARCHABLE.includes(pathname);

  return (
    <>
      {/* utility bar */}
      <div className="util">
        <div className="wrap">
          <div className="live">
            <span className="dot"></span> Live · Tracking the next window
          </div>
          <div className="r">
            <span suppressHydrationWarning>{date}</span>
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* masthead */}
      <header className="masthead">
        <div className="wrap">
          <div className="eyebrow">Dispatches from low orbit and beyond</div>
          <Link className="nameplate" href="/">
            News <span className="from">from</span> Space
          </Link>
        </div>
      </header>

      {/* nav */}
      <nav className="primary">
        <div className="wrap">
          {PAGES.map((p) => {
            if (p.has) {
              return (
                <Dropdown key={p.key}>
                  <DropdownTrigger>
                    <button
                      className={`navlink${isActive(p.key) ? " active" : ""}`}
                      aria-label="Launches menu"
                    >
                      {p.label}
                      <span style={{ marginLeft: 6, color: "var(--ink3)" }}>
                        ⌄
                      </span>
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Launches"
                    itemClasses={{ title: "font-grotesk" }}
                  >
                    <DropdownItem as={Link} href="/launches" key="upcoming">
                      Upcoming
                    </DropdownItem>
                    <DropdownItem as={Link} href="/launches/past" key="past">
                      Past
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              );
            }
            return (
              <Link
                key={p.key}
                href={p.href}
                className={`navlink${p.mission ? " mission" : ""}${
                  isActive(p.key) ? " active" : ""
                }`}
              >
                {p.mission && <span className="ld"></span>}
                {p.label}
              </Link>
            );
          })}

          {showSearch && (
            <div className="nav-search">
              <Suspense>
                <SearchInput />
              </Suspense>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
