import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar, AppHeader, FeedsList } from "@/widgets";

export const FeedsPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader
          isInDashboardPage={false}
          breadcrumbItemName="Feeds"
          hasLangSelector={true}
        />
        <FeedsList />
      </SidebarInset>
    </SidebarProvider>
  );
};
