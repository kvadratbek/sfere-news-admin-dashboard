import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./protected-route"; // Adjust path as needed
import {
  LoginPage,
  DashboardPage,
  FeedCategoriesPage,
  FeedsPage,
  FeedContentsPage,
  FeedItemsPage,
} from "@/pages";
import { Callback } from "@/features/authentication";

export const AppRouterProtector = () => {
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
      element: (
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/feed-categories",
      element: (
        <ProtectedRoute>
          <FeedCategoriesPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/feeds",
      element: (
        <ProtectedRoute>
          <FeedsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/feeds/:feedId",
      element: (
        <ProtectedRoute>
          <FeedContentsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/feed-items",
      element: (
        <ProtectedRoute>
          <FeedItemsPage />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={routerConfig} />;
};
