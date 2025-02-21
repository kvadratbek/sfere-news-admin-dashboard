import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard, Categories, Feeds, Content } from "@/pages";

export const AppRouter = () => {
  const routerConfig = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/feed-categories",
      element: <Categories />,
    },
    {
      path: "/feeds",
      element: <Feeds />,
    },
    {
      path: "/feeds/:feedId",
      element: <Content />,
    },
  ]);
  return <RouterProvider router={routerConfig} />;
};
