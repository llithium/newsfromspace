import { Outlet, useNavigate } from "react-router-dom";
import { Link, NextUIProvider } from "@nextui-org/react";

function Root() {
  const navigate = useNavigate();
  return (
    <>
      <NextUIProvider navigate={navigate}>
        <div className="sm:w-4/5 mx-auto w-11/12 ">
          <nav className="flex flex-row justify-between items-center py-12">
            <Link
              className="text-black scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
              href="/"
            >
              News from Space
            </Link>
            <Link
              href="/articles"
              className="text-black text-xl font-bold h-max "
            >
              Articles
            </Link>
          </nav>

          <Outlet />
        </div>
      </NextUIProvider>
    </>
  );
}

export default Root;
