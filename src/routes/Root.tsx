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
              <p className="font-bold text-inherit">
                <Link color="foreground" href="/">
                  News From Space
                </Link>
              </p>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden gap-4 sm:flex" justify="center">
            <NavbarItem
              isActive={
                location.pathname.startsWith("/articles") ||
                location.pathname === "/"
              }
            >
              <Link color="foreground" href="/articles">
                Articles
              </Link>
            </NavbarItem>
            <NavbarItem isActive={location.pathname.startsWith("/blogs")}>
              <Link color="foreground" href="/blogs">
                Blogs
              </Link>
            </NavbarItem>
            <NavbarItem isActive={location.pathname == "/reports"}>
              <Link color="foreground" href="#">
                Reports
              </Link>
            </NavbarItem>
          </NavbarContent>
          {/* Login/Sign Up */}
          <NavbarContent justify="end">
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
        <div className="mx-auto w-11/12">
          <Outlet />
        </div>
      </NextUIProvider>
    </>
  );
}

export default Root;
