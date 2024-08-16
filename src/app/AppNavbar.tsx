"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Suspense, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { usePathname } from "next/navigation";
import SearchInput from "./SearchInput";
import Link from "next/link";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar
      className="z-50 mb-3 pt-1"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <Logo /> */}
          <h1 className="font-bold text-inherit">
            <Link
              className="transition-opacity hover:opacity-80 active:opacity-disabled"
              color="foreground"
              href="/"
            >
              News From Space
            </Link>
          </h1>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem isActive={pathname.startsWith("/articles")}>
          <Link
            className="transition-opacity hover:opacity-80 active:opacity-disabled"
            color="foreground"
            href="/articles"
          >
            Articles
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem isActive={pathname.startsWith("/launches")}>
            <DropdownTrigger>
              <Button
                className={`flex items-center px-0 pl-2 text-medium text-foreground transition-opacity hover:opacity-80 active:opacity-disabled ${pathname.startsWith("/launches") && "font-semibold"}`}
                // color="foreground"
                variant="light"
                endContent={
                  <svg
                    className="px-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#888888"
                      d="m17.5 8.086l-5.5 5.5l-5.5-5.5L5.086 9.5L12 16.414L18.914 9.5z"
                    />
                  </svg>
                }
              >
                Launches
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Launches"
            className="w-44"
            itemClasses={{
              base: "gap-4",
              title: "text-center text-medium",
            }}
          >
            <DropdownItem as={Link} href="/launches" key="upcoming">
              Upcoming
            </DropdownItem>
            <DropdownItem as={Link} href="/launches/past" key="past">
              Past
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem isActive={pathname.startsWith("/blogs")}>
          <Link
            className="transition-opacity hover:opacity-80 active:opacity-disabled"
            color="foreground"
            href="/blogs"
          >
            Blogs
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent
        className={`hidden sm:flex ${pathname !== "/articles" && pathname !== "/launches" && pathname !== "/launches/past" && pathname !== "/blogs" ? "sm:hidden" : ""}`}
        justify="end"
      >
        <Suspense>
          <SearchInput />
        </Suspense>
      </NavbarContent>
      <NavbarContent
        className={`${
          pathname !== "/articles" &&
          pathname !== "/launches" &&
          pathname !== "/blogs"
            ? ""
            : "data-[justify=end]:flex-grow-0"
        }`}
        justify="end"
      >
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem
          className={`${pathname !== "/articles" && pathname !== "/launches" && pathname !== "/launches/past" && pathname !== "/blogs" ? "hidden" : ""}`}
        >
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname.startsWith("/articles")}>
          <Link
            color="foreground"
            className="w-full transition-opacity hover:opacity-80 active:opacity-disabled"
            href="/articles"
            onClick={() => setIsMenuOpen(false)}
          >
            Articles
          </Link>
        </NavbarMenuItem>
        <Dropdown>
          <NavbarMenuItem isActive={pathname.startsWith("/launches")}>
            <DropdownTrigger>
              <Button
                className={`flex h-7 items-center px-0 text-lg text-foreground transition-opacity hover:opacity-80 active:opacity-disabled ${pathname.startsWith("/launches") && "font-semibold"}`}
                variant="light"
                size="sm"
                endContent={
                  <svg
                    className="px-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#888888"
                      d="m17.5 8.086l-5.5 5.5l-5.5-5.5L5.086 9.5L12 16.414L18.914 9.5z"
                    />
                  </svg>
                }
              >
                Launches
              </Button>
            </DropdownTrigger>
          </NavbarMenuItem>
          <DropdownMenu
            aria-label="Launches"
            className="w-44"
            itemClasses={{
              base: "gap-4",
              title: "text-center text-medium",
            }}
          >
            <DropdownItem
              as={Link}
              href="/launches"
              key="upcoming"
              onClick={() => setIsMenuOpen(false)}
            >
              Upcoming
            </DropdownItem>

            <DropdownItem
              as={Link}
              href="/launches/past"
              key="past"
              onClick={() => setIsMenuOpen(false)}
            >
              Past
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarMenuItem isActive={pathname.startsWith("/blogs")}>
          <Link
            color="foreground"
            className="w-full transition-opacity hover:opacity-80 active:opacity-disabled"
            href="/blogs"
            onClick={() => setIsMenuOpen(false)}
          >
            Blogs
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
