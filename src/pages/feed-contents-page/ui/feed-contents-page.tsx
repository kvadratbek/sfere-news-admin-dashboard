import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppHeader, AppSidebar, FeedContentsList } from "@/widgets";

export const FeedContentsPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader breadcrumbItemName="Feeds" />
        <FeedContentsList />
      </SidebarInset>
    </SidebarProvider>
  );
};
