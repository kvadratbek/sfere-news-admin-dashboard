import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar, AppHeader, FeedCategoriesList } from "@/widgets";
import { CreateFeedCategory } from "@/features/feed-categories";

export const FeedCategoriesPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader
          isInDashboardPage={false}
          breadcrumbItemName="Feed Categories"
          hasLangSelector={true}
          actionButton={<CreateFeedCategory />}
        />
        <FeedCategoriesList />
      </SidebarInset>
    </SidebarProvider>
  );
};
