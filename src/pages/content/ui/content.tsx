import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar, AppHeader, ContentsList } from "@/widgets";
import { CreateContent } from "@/features/content";

export const Content = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader
          isInDashboardPage={false}
          breadcrumbItemName="Feeds"
          hasLangSelector={false}
          actionButton={<CreateContent />}
        />
        <ContentsList />
      </SidebarInset>
    </SidebarProvider>
  );
};
