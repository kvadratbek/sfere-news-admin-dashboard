import {
  Table,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
} from "@/shared/ui/table";
import { Feed } from "@/entities/feed/ui/feed";
import { QueryFilter } from "@/entities";
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
import { useFeedsList } from "../model";
import { FeedsListLoading } from "./feeds-list-loading";
import { FeedsListError } from "./feeds-list-error";
import { FeedsTableHeader } from "./table-header";

export const FeedsList = () => {
  const {
    feeds,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    queryLimit,
    setQueryLimit,
    queryPriority,
    toggleQueryPriority,
    totalPages,
  } = useFeedsList();

 

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex justify-between items-center mt-4 p-4 rounded-xl bg-muted/50">
        <QueryFilter>
          <QueryLimit
            labelText="Feeds per Page"
            limitValue={queryLimit}
            limitOnChange={setQueryLimit}
          />
          <QueryPriority
            onPriorityChange={toggleQueryPriority}
            priorityStatus={queryPriority ? "On" : "Off"}
          />
          <QueryLanguage />
        </QueryFilter>
        <CreateFeed />
      </div>

      {isLoading ? (
        <FeedsListLoading />
      ) : error ? (
        <FeedsListError />
      ) : (
        <div className="w-full max-w-full overflow-x-auto rounded-xl bg-muted/50 p-4">
          <Table>
            <FeedsTableHeader />
            <TableBody>
              {feeds?.map((feed) => (
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
            <TableFooter>
              <TableRow>
                <TableCell colSpan={10}>
                  <AppPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </div>
  );
};
