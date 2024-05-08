"use client";
import { createClient } from "@/utils/supabase/client";
import { Button, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
const supabase = createClient();
// const { data, error } = await supabase.auth.getUser();
async function signOut() {
  const { error } = await supabase.auth.signOut();
}
export default function AccountButtons() {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();

      setUser(data);
    }
    getUser();
  });
  if (error || !user) {
    return (
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
          <Button as={Link} color="default" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </>
    );
  } else {
    return (
      <NavbarItem>
        <Button color="default" onClick={signOut} variant="flat">
          Sign Out
        </Button>
      </NavbarItem>
    );
  }
}
