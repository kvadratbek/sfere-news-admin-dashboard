import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { lazy, Suspense, Component } from "react";

// Lazy load page components
const LoginPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.LoginPage }))
);
const DashboardPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.DashboardPage }))
);
const FeedCategoriesPage = lazy(() =>
  import("@/pages/").then((module) => ({ default: module.FeedCategoriesPage }))
);
const FeedsPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.FeedsPage }))
);
const FeedContentsPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.FeedContentsPage }))
);
const FeedItemsPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.FeedItemsPage }))
);
const Callback = lazy(() =>
  import("@/features/authentication").then((module) => ({
    default: module.Callback,
  }))
);

// Error boundary
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again.</div>;
    }
    return this.props.children;
  }
}

// Skeleton fallback
const SkeletonPage = () => (
  <div className="skeleton">
    <div className="skeleton-header" />
    <div className="skeleton-content" />
  </div>
);

// Root layout with Suspense
const RootLayout = () => (
  <ErrorBoundary>
    <Suspense fallback={<SkeletonPage />}>
      <Outlet />
    </Suspense>
  </ErrorBoundary>
);

export const AppRouter = () => {
  const routerConfig = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
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
      ],
    },
  ]);

  return <RouterProvider router={routerConfig} />;
};
