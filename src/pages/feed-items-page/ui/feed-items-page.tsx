import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar, AppHeader, FeedItemsList } from "@/widgets";
import { CreateFeedItem } from "@/features/feed-items";

export const FeedItemsPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader
          isInDashboardPage={false}
          breadcrumbItemName="Feed Items"
          hasLangSelector={true}
          actionButton={<CreateFeedItem />}
        />
        <FeedItemsList />
      </SidebarInset>
    </SidebarProvider>
  );
};
