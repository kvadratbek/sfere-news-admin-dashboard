import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppHeader, AppSidebar } from "@/widgets";
import { CategoryKeysList } from "@/widgets/feed-categories-keys-list";
export const FeedCategoriesKeysPage = () => {
  return (
       <SidebarProvider>
         <AppSidebar />
         <SidebarInset>
           <AppHeader breadcrumbItemName="Feed Categories Keys" />
           <CategoryKeysList/>
         </SidebarInset>
       </SidebarProvider>
  )
}