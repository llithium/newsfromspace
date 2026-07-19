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
  const [date, setDate] = useState({ long: "", short: "" });

  useEffect(() => {
    const now = new Date();
    setDate({
      long: now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      short: now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    });
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
            <span className="dot" aria-hidden="true"></span>
            <span className="wide-label">Live · Tracking the next window</span>
            <span className="short-label">Launch tracking</span>
          </div>
          <div className="r">
            <span className="wide-label" suppressHydrationWarning>
              {date.long}
            </span>
            <span className="short-label" suppressHydrationWarning>
              {date.short}
            </span>
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
        <div className="wrap nav-desktop">
          {PAGES.map((p) => {
            if (p.has) {
              return (
                <Dropdown key={p.key}>
                  <DropdownTrigger>
                    <button
                      className={["navlink", isActive(p.key) ? "active" : ""]
                        .filter(Boolean)
                        .join(" ")}
                      aria-label="Launches menu"
                      aria-current={isActive(p.key) ? "page" : undefined}
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
                className={[
                  "navlink",
                  p.mission ? "mission" : "",
                  isActive(p.key) ? "active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={isActive(p.key) ? "page" : undefined}
              >
                {p.mission && <span className="ld" aria-hidden="true"></span>}
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
        <div className="wrap nav-mobile">
          <Dropdown>
            <DropdownTrigger>
              <button
                className="mobile-sections"
                aria-label="Open sections menu"
              >
                Sections <span aria-hidden="true">⌄</span>
              </button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Sections"
              itemClasses={{ title: "font-grotesk" }}
            >
              <DropdownItem as={Link} href="/articles" key="articles">
                Articles
              </DropdownItem>
              <DropdownItem as={Link} href="/launches" key="upcoming">
                Upcoming launches
              </DropdownItem>
              <DropdownItem as={Link} href="/launches/past" key="past">
                Past launches
              </DropdownItem>
              <DropdownItem as={Link} href="/blogs" key="blogs">
                Blogs
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Link
            href="/mission-control"
            className={["mobile-mission", isActive("mission") ? "active" : ""]
              .filter(Boolean)
              .join(" ")}
            aria-current={isActive("mission") ? "page" : undefined}
          >
            <span className="ld" aria-hidden="true"></span> Mission Control
          </Link>
        </div>
        {showSearch ? (
          <div className="wrap mobile-search">
            <Suspense>
              <SearchInput />
            </Suspense>
          </div>
        ) : null}
      </nav>
    </>
  );
}
