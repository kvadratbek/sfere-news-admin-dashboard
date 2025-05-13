import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { lazy, Suspense, Component } from "react";

// Lazy load page components
const TestPage = lazy(() =>
  import("@/pages/test/test").then((module) => ({ default: module.TestPage }))
);
const LoginPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.LoginPage }))
);
const DashboardPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.DashboardPage }))
);
const FeedCategoriesPage = lazy(() =>
  import("@/pages/").then((module) => ({ default: module.FeedCategoriesPage }))
);
const FeedCategoriesKeysPage = lazy(() =>
  import("@/pages/").then((module) => ({ default: module.FeedCategoriesKeysPage }))
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

class ErrorBoundary extends Component<{ children: React.ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="w-full h-[100vh] flex items-center justify-center">
        <h1 className="text-xl font-bold">❌Something went wrong. Please try again...</h1>
      </div>;
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
          path: "/feed-categories/:urlCategoryId",
          element: <FeedCategoriesKeysPage />,
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
        {
          path: "test",
          element: <TestPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routerConfig} />;
};
