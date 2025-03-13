import { SidebarProvider, SidebarInset } from "@/shared/ui/sidebar";
import { AppHeader, AppSidebar } from "@/widgets";
import {
  VisitorsByDeviceChart,
  MostPopularCategoriesChart,
  NewsNumberChart,
  VisitorsByBrowser,
} from "@/widgets/dashboard-charts";

export const DashboardPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <NewsNumberChart />
            <MostPopularCategoriesChart />
            <VisitorsByBrowser />
          </div>
          <VisitorsByDeviceChart />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
