import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
  NextUIProvider,
} from "@nextui-org/react";
import { useState } from "react";

function Root() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  console.log(location.pathname === "/articles" || location.pathname === "/");

  return (
    <>
      <NextUIProvider navigate={navigate}>
        <Navbar className="mb-3" onMenuOpenChange={setIsMenuOpen}>
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              {/* <Logo /> */}
              <p className="font-bold text-inherit">News From Space</p>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem
              isActive={
                location.pathname === "/articles" || location.pathname === "/"
              }
            >
              <Link color="foreground" href="/articles">
                Articles
              </Link>
            </NavbarItem>
            <NavbarItem isActive={location.pathname == "/blogs"}>
              <Link color="foreground" href="#">
                Blogs
              </Link>
            </NavbarItem>
            {/* <NavbarItem isActive={location.pathname == "/"}>
              <Link color="foreground" href="#">
                Integrations
              </Link>
            </NavbarItem> */}
          </NavbarContent>
          {/* Loging/Sign Up */}
          {/* <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent> */}
          <NavbarMenu>
            <NavbarMenuItem
              isActive={
                location.pathname === "/articles" || location.pathname === "/"
              }
            >
              <Link
                color="foreground"
                className="w-full"
                href="/articles"
                size="lg"
              >
                Articles
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem isActive={location.pathname === "/blogs"}>
              <Link
                color="foreground"
                className="w-full"
                href="/blogs"
                size="lg"
              >
                Blogs
              </Link>
            </NavbarMenuItem>
          </NavbarMenu>
        </Navbar>
        <div className="mx-auto w-11/12 ">
          <Outlet />
        </div>
      </NextUIProvider>
    </>
  );
}

export default Root;
