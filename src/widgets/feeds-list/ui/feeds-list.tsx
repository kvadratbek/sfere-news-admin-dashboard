import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Feed, QueryFilter } from "@/entities";
import {
  AppPagination,
  QueryLanguage,
  QueryLimit,
  QueryPriority,
} from "@/features";
import {
  CreateFeed,
  RefreshFeedItems,
  ViewContents,
  UpdateFeed,
  DeleteFeed,
} from "@/features/feeds";
import { useGetAllFeedsQuery } from "@/shared/api/feeds-api";
// import { RefreshFeedItems } from "@/features/feeds/refresh-feed-items/ui/resfresh-feed-items";

export const FeedsList = () => {
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [queryLimit, setQueryLimit] = useState(100);
  const [queryPriority, setQueryPriority] = useState(true);
  const { data, isLoading, error } = useGetAllFeedsQuery({
    limit: queryLimit,
    page: currentPage,
    priority: queryPriority,
    lang: selectedLanguage,
  });
  const totalPages = 1;
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
      <div className="flex justify-between items-center mt-4 p-4 rounded-xl bg-muted/50">
        <QueryFilter>
          <QueryLimit
            labelText="Feeds per Page"
            limitValue={queryLimit}
            limitOnChange={(e) => setQueryLimit(e.target.value)}
          />
          <QueryPriority
            onPriorityChange={() =>
              setQueryPriority((queryPriority) => !queryPriority)
            }
            priorityStatus={queryPriority ? "On" : "Off"}
          />
          <QueryLanguage />
        </QueryFilter>
        <CreateFeed />
      </div>
      <div className="w-full max-w-full overflow-x-auto rounded-xl bg-muted/50 p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Lang</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              {/* <TableHead>Refresh</TableHead>
              <TableHead>View Contents</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataFeeds?.map((feed) => (
              <Feed
                key={feed.id}
                feed={feed}
                viewContentsFeature={<ViewContents feedId={feed.id} />}
                refreshFeature={<RefreshFeedItems id={feed.id} />}
                updateFeature={<UpdateFeed updateFeedId={feed.id} />}
                deleteFeature={<DeleteFeed deleteFeedId={feed.id} />}
              />
            ))}
          </TableBody>
          {totalPages > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={9}>
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
