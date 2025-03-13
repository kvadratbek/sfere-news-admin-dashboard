import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppHeader, AppSidebar, FeedItemsList } from "@/widgets";

export const FeedItemsPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader breadcrumbItemName="Feed Items" />
        <FeedItemsList />
      </SidebarInset>
    </SidebarProvider>
  );
};
