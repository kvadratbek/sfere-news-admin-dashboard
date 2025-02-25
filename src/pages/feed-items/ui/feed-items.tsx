import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar, AppHeader, ItemsList } from "@/widgets";
import { CreateFeedItem } from "@/features/feed-items";

export const FeedItems = () => {
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
        <ItemsList />
      </SidebarInset>
    </SidebarProvider>
  );
};
