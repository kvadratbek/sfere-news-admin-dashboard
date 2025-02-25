import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar, AppHeader, ItemsList } from "@/widgets";
import { CreateCategory } from "@/features/categories";

export const FeedItems = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader
          isInDashboardPage={false}
          breadcrumbItemName="Feed Categories"
          hasLangSelector={true}
          actionButton={<CreateCategory />}
        />
        <ItemsList />
      </SidebarInset>
    </SidebarProvider>
  );
};
