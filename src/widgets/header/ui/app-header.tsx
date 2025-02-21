import { useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { ModeToggle } from "@/shared/ui/mode-toggle";
import { Separator } from "@/shared/ui/separator";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { IAppHeader } from "../model";
import { LangSelector } from "@/features";

export const AppHeader = ({
  isInDashboardPage = false,
  breadcrumbItemName,
  hasLangSelector,
  actionButton,
}: IAppHeader) => {
  const navigateTo = useNavigate();
  const { feedId } = useParams();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 h-4" />
      <ModeToggle />
      <Separator orientation="vertical" className="mr-1 h-4" />
      {hasLangSelector && (
        <>
          <LangSelector />
          <Separator orientation="vertical" className="mr-1 h-4" />
        </>
      )}
      <div className="flex justify-between items-center w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                className="cursor-pointer"
                onClick={() => navigateTo("/")}
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            {isInDashboardPage && !feedId && (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{breadcrumbItemName}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
            {feedId && (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="transition-colors cursor-pointer"
                    onClick={() => navigateTo("/feeds")}
                  >
                    {breadcrumbItemName}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Feed ID: {feedId}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        {actionButton}
      </div>
    </header>
  );
};
