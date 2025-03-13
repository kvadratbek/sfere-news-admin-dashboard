import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppHeader, AppSidebar, FeedsList } from "@/widgets";

export const FeedsPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader breadcrumbItemName="Feeds" />
        <FeedsList />
      </SidebarInset>
    </SidebarProvider>
  );
};
