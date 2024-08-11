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
import { Suspense, useEffect, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { usePathname } from "next/navigation";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { createClient } from "@/app/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import { logout } from "./actions";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();

      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          setError(error.message);
        } else {
          setSession(data.session);
        }
      } catch (error: unknown) {
        setError(error);
      }
    };
    fetchUserData();
  }, [pathname, isMenuOpen]);

  return (
    <Navbar
      className="z-50 mb-3"
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
        {error || !session ? null : (
          <NavbarItem isActive={pathname.startsWith("/bookmarks")}>
            <Link
              className="transition-opacity hover:opacity-80 active:opacity-disabled"
              color="foreground"
              href="/bookmarks"
            >
              Bookmarks
            </Link>
          </NavbarItem>
        )}
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
          error ||
          !session ||
          (pathname !== "/articles" &&
            pathname !== "/launches" &&
            pathname !== "/blogs")
            ? ""
            : "data-[justify=end]:flex-grow-0"
        }`}
        justify="end"
      >
        {error || !session ? (
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
        ) : null}
        {/* Login/Sign Up */}
        {error || !session ? (
          <>
            <NavbarItem>
              <Link
                className="transition-opacity hover:opacity-80 active:opacity-disabled"
                color="foreground"
                href="/login"
              >
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                className="hidden md:flex"
                as={Link}
                color="default"
                href="/signup"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="flat" isIconOnly>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <g className="stroke-current" fill="none">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M13.765 2.152C13.398 2 12.932 2 12 2c-.932 0-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083c-.092.223-.129.484-.143.863a1.617 1.617 0 0 1-.79 1.353a1.617 1.617 0 0 1-1.567.008c-.336-.178-.579-.276-.82-.308a2 2 0 0 0-1.478.396C4.04 5.79 3.806 6.193 3.34 7c-.466.807-.7 1.21-.751 1.605a2 2 0 0 0 .396 1.479c.148.192.355.353.676.555c.473.297.777.803.777 1.361c0 .558-.304 1.064-.777 1.36c-.321.203-.529.364-.676.556a2 2 0 0 0-.396 1.479c.052.394.285.798.75 1.605c.467.807.7 1.21 1.015 1.453a2 2 0 0 0 1.479.396c.24-.032.483-.13.819-.308a1.617 1.617 0 0 1 1.567.008c.483.28.77.795.79 1.353c.014.38.05.64.143.863a2 2 0 0 0 1.083 1.083C10.602 22 11.068 22 12 22c.932 0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083c.092-.223.129-.483.143-.863c.02-.558.307-1.074.79-1.353a1.617 1.617 0 0 1 1.567-.008c.336.178.579.276.819.308a2 2 0 0 0 1.479-.396c.315-.242.548-.646 1.014-1.453c.466-.807.7-1.21.751-1.605a2 2 0 0 0-.396-1.479c-.148-.192-.355-.353-.676-.555A1.617 1.617 0 0 1 19.562 12c0-.558.304-1.064.777-1.36c.321-.203.529-.364.676-.556a2 2 0 0 0 .396-1.479c-.052-.394-.285-.798-.75-1.605c-.467-.807-.7-1.21-1.015-1.453a2 2 0 0 0-1.479-.396c-.24.032-.483.13-.82.308a1.617 1.617 0 0 1-1.566-.008a1.617 1.617 0 0 1-.79-1.353c-.014-.38-.05-.64-.143-.863a2 2 0 0 0-1.083-1.083Z" />
                      </g>
                    </svg>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem as={Link} href="/account" key="account">
                    Account
                  </DropdownItem>
                  <DropdownItem
                    as={ThemeSwitcher}
                    key="themeSwitcher"
                    textValue="themeSwitcher"
                  ></DropdownItem>
                  <DropdownItem
                    key="signOut"
                    onPress={() => {
                      logout();
                    }}
                  >
                    Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </>
        )}
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
        {error || !session ? null : (
          <NavbarMenuItem isActive={pathname.startsWith("/bookmarks")}>
            <Link
              color="foreground"
              className="w-full transition-opacity hover:opacity-80 active:opacity-disabled"
              href="/bookmarks"
              onClick={() => setIsMenuOpen(false)}
            >
              Bookmarks
            </Link>
          </NavbarMenuItem>
        )}
        <NavbarMenuItem>
          <Link
            color="foreground"
            className="w-full transition-opacity hover:opacity-80 active:opacity-disabled"
            href="/signup"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
