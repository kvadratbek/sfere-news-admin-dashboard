import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardPage,
  FeedCategoriesPage,
  FeedsPage,
  FeedContentsPage,
  FeedItemsPage,
} from "@/pages";

export const AppRouter = () => {
  const routerConfig = createBrowserRouter([
    {
      path: "/",
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
