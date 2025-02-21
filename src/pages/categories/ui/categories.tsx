import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar, AppHeader, CategoriesList } from "@/widgets";
import { CreateCategory } from "@/features/categories";

export const Categories = () => {
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
        <CategoriesList />
      </SidebarInset>
    </SidebarProvider>
  );
};
