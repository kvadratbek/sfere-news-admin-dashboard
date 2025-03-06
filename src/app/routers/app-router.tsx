import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LoginPage,
  DashboardPage,
  FeedCategoriesPage,
  FeedsPage,
  FeedContentsPage,
  FeedItemsPage,
} from "@/pages";
import { Callback } from "@/features/authentication";

export const AppRouter = () => {
  const routerConfig = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/callback",
      element: <Callback />,
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
    {
      path: "/feed-categories",
      element: <FeedCategoriesPage />,
    },
    {
      path: "/feeds",
      element: <FeedsPage />,
    },
    {
      path: "/feeds/:feedId",
      element: <FeedContentsPage />,
    },
    {
      path: "feed-items",
      element: <FeedItemsPage />,
    },
  ]);
  return <RouterProvider router={routerConfig} />;
};
