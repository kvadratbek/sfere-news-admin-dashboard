import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppHeader, AppSidebar, FeedCategoriesList } from "@/widgets";

export const FeedCategoriesPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader breadcrumbItemName="Feed Categories" />
        <FeedCategoriesList />
      </SidebarInset>
    </SidebarProvider>
  );
};
