import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar, AppHeader, FeedsList } from "@/widgets";
import { CreateFeed } from "@/features/feeds";

export const Feeds = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader
          isInDashboardPage={false}
          breadcrumbItemName="Feeds"
          hasLangSelector={true}
          actionButton={<CreateFeed />}
        />
        <FeedsList />
      </SidebarInset>
    </SidebarProvider>
  );
};
