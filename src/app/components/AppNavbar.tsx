"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
} from "@nextui-org/react";

import { useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { usePathname } from "next/navigation";
import SearchInput from "./SearchInput";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  return (
    <Navbar className="mb-3" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <Logo /> */}
          <h1 className="font-bold text-inherit">
            <Link color="foreground" href="/">
              News From Space
            </Link>
          </h1>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem isActive={pathname.startsWith("/articles")}>
          <Link color="foreground" href="/articles">
            Articles
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname == "/launches"}>
          <Link color="foreground" href="/launches">
            Launches
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname.startsWith("/blogs")}>
          <Link color="foreground" href="/blogs">
            Blogs
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent
        className={`hidden sm:flex ${pathname === "/" ? "sm:hidden" : ""}`}
        justify="end"
      >
        <SearchInput />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher></ThemeSwitcher>
        </NavbarItem>
        {/* Login/Sign Up */}
        <NavbarItem className="hidden lg:flex">
          <Link color="foreground" href="#">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="default" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <SearchInput />
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === "/articles"}>
          <Link
            color="foreground"
            className="w-full"
            href="/articles"
            size="lg"
          >
            Articles
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === "/launches"}>
          <Link
            color="foreground"
            className="w-full"
            href="/launches"
            size="lg"
          >
            Launches
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === "/blogs"}>
          <Link color="foreground" className="w-full" href="/blogs" size="lg">
            Blogs
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
