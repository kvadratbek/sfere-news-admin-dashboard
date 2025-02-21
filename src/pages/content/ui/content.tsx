import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar, AppHeader, ContentsList } from "@/widgets";
import { CreateFeed } from "@/features/feeds";

export const Content = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader
          isInDashboardPage={false}
          breadcrumbItemName="Feeds"
          hasLangSelector={false}
          actionButton={<CreateFeed />}
        />
        <ContentsList />
      </SidebarInset>
    </SidebarProvider>
  );
};
