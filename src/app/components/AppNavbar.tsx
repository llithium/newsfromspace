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
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { usePathname } from "next/navigation";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { signOutAction } from "@/actions";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [sessionData, setSessionData] = useState<SessionData>({
    session: null,
  });
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();

      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          setError(error.message);
        } else {
          setSessionData(data as SessionData);
          console.log(data);
        }
      } catch (error: unknown) {
        setError(error);
      }
    };
    fetchUserData();
  }, [pathname]);

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
        <NavbarItem isActive={pathname == "/launches"}>
          <Link
            className="transition-opacity hover:opacity-80 active:opacity-disabled"
            color="foreground"
            href="/launches"
          >
            Launches
          </Link>
        </NavbarItem>
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
        {error || !sessionData.session ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link
                className="transition-opacity hover:opacity-80 active:opacity-disabled"
                color="foreground"
                href="/login"
              >
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="default" href="/login" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <form action={signOutAction}>
            <Button type="submit" color="default" variant="flat">
              Sign Out
            </Button>
          </form>
        )}
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem className={`${pathname === "/" ? "hidden" : ""}`}>
          <SearchInput />
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === "/articles"}>
          <Link
            color="foreground"
            className="w-full transition-opacity hover:opacity-80 active:opacity-disabled"
            href="/articles"
          >
            Articles
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === "/launches"}>
          <Link
            color="foreground"
            className="w-full transition-opacity hover:opacity-80 active:opacity-disabled"
            href="/launches"
          >
            Launches
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === "/blogs"}>
          <Link
            color="foreground"
            className="w-full transition-opacity hover:opacity-80 active:opacity-disabled"
            href="/blogs"
          >
            Blogs
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
export interface SessionData {
  session: Session | null;
}

export interface Session {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number | undefined;
  refresh_token: string;
  user: User;
}

export interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: Date;
  phone: string;
  confirmation_sent_at: Date;
  confirmed_at: Date;
  last_sign_in_at: Date;
  app_metadata: AppMetadata;
  user_metadata: Data;
  identities: Identity[];
  created_at: Date;
  updated_at: Date;
  is_anonymous: boolean;
}

export interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface Identity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: Data;
  provider: string;
  last_sign_in_at: Date;
  created_at: Date;
  updated_at: Date;
  email: string;
}

export interface Data {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}
