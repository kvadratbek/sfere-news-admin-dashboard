import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar, AppHeader, FeedContentsList } from "@/widgets";
import { CreateFeedContent } from "@/features/feed-contents";

export const FeedContentsPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader
          isInDashboardPage={false}
          breadcrumbItemName="Feeds"
          hasLangSelector={false}
          actionButton={<CreateFeedContent />}
        />
        <FeedContentsList />
      </SidebarInset>
    </SidebarProvider>
  );
};
