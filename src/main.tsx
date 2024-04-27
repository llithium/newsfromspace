import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root.tsx";
import ArticleCard from "./routes/ArticleCard.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
import ArticlesPage from "./routes/ArticlesPage.tsx";
import BlogsPage from "./routes/BlogsPage.tsx";
import BlogCard from "./routes/BlogCard.tsx";
import NoMatch from "./routes/NoMatch.tsx";
import LaunchesPage from "./routes/LaunchesPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "*", element: <NoMatch /> },
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <ArticlesPage />,
          },

          {
            path: "/articles",
            element: <ArticlesPage />,

            children: [
              {
                path: "/articles/:id",
                element: <ArticleCard />,
              },
            ],
          },
          {
            path: "/blogs",
            element: <BlogsPage />,
            children: [
              {
                path: "/blogs/:id",
                element: <BlogCard />,
              },
            ],
          },
          { path: "/launches", element: <LaunchesPage /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
