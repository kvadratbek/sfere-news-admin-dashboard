import { SidebarProvider, SidebarInset } from "@/shared/ui/sidebar";
import { AppSidebar, AppHeader } from "@/widgets";
import {
  NewsNumberChart,
  MostPopularCategoriesChart,
  VisitorsByBrowser,
  VisitorsByDeviceChart,
} from "@/widgets/dashboard-charts";

export const Dashboard = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader isInDashboardPage={true} hasLangSelector={false} />
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
