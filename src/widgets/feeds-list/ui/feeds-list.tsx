import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useGetAllFeedsQuery } from "@/shared/api/feeds-api";
import { AppPagination } from "@/features";
import { ViewContents, UpdateFeed, DeleteFeed } from "@/features/feeds";
import { CalculatePagesNumber } from "../lib";
import { Feed } from "@/entities";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Skeleton } from "@/shared/ui/skeleton";

export const FeedsList = () => {
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = CalculatePagesNumber();
  const { data, isLoading, error } = useGetAllFeedsQuery({
    limit: 10,
    page: currentPage,
    priority: false,
    lang: selectedLanguage,
  });
  const dataFeeds = data;

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="rounded-xl bg-muted/50 p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Max Items</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Lang</TableHead>
                <TableHead>Logo</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={2}>
                    <Skeleton className="h-[20.8px] w-[full] m-[5px]" />
                  </TableCell>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-[20.8px] w-[full] m-[5px]" />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Skeleton className="h-[20.8px] w-[full] m-[5px]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="text-center rounded-xl bg-muted/50 p-4">
          ❌ Error fetching feeds. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="rounded-xl bg-muted/50 p-4">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Lang</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="max-w-[50%]">Description</TableHead>
              <TableHead>View Contents</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataFeeds?.map((feed) => (
              <Feed
                key={feed.id}
                feed={feed}
                viewContentsFeature={<ViewContents feedId={feed.id} />}
                updateFeature={<UpdateFeed updateFeedId={feed.id} />}
                deleteFeature={<DeleteFeed deleteFeedId={feed.id} />}
              />
            ))}
          </TableBody>
          {totalPages > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={8}>
                  <AppPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  );
};
