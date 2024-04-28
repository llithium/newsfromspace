import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
  console.log(location.pathname);

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
              <h1 className="font-bold text-inherit">
                <Link color="foreground" href="/">
                  News From Space
                </Link>
              </h1>
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
            <NavbarItem isActive={location.pathname == "/launches"}>
              <Link color="foreground" href="/launches">
                Launches
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
            <NavbarMenuItem isActive={location.pathname === "/launches"}>
              <Link
                color="foreground"
                className="w-full"
                href="/launches"
                size="lg"
              >
                Launches
              </Link>
            </NavbarMenuItem>
          </NavbarMenu>
        </Navbar>
        <div className="mx-auto w-11/12">
          <Outlet />
        </div>
        <ScrollRestoration
          getKey={(location) => {
            return location.key;
          }}
        />
      </NextUIProvider>
    </>
  );
}

export default Root;
