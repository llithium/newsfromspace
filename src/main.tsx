import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root.tsx";
import Card from "./routes/Card.tsx";
import ErrorPage from "./Components/ErrorPage.tsx";
import ArticlesPage from "./routes/ArticlesPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
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
                element: <Card />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
