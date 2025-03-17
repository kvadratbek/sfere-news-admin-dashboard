import { useState, memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useGetAllFeedItemsQuery } from "@/shared/api/feed-items-api";
import {
  AppPagination,
  QueryId,
  QueryLanguage,
  QueryLimit,
  QuerySort,
} from "@/features";
import { CreateFeedItem, UpdateFeedItem } from "@/features/feed-items";
import { FeedItem, QueryFilter } from "@/entities";
import { Table, TableBody } from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { LoadingSkeleton } from "./loading-skeleton";
import { ItemsHeader } from "./items-header";
import { ItemsFooter } from "./items-footer";
import { DeleteFeedItem } from "@/features/feed-items/delete-feed-tem/ui/delete-feed-item";

const ControlBar = memo(
  ({
    queryLimit,
    setQueryLimit,
    queryFeedId,
    setQueryFeedId,
    queryFeedCategoryId,
    setQueryFeedCategoryId,
    querySort,
    setQuerySort,
  }: {
    queryLimit: number | undefined;
    setQueryLimit: (value: number | undefined) => void;
    queryFeedId: number | undefined;
    setQueryFeedId: (value: number | undefined) => void;
    queryFeedCategoryId: number | undefined;
    setQueryFeedCategoryId: (value: number | undefined) => void;
    querySort: string | undefined;
    setQuerySort: (value: string | undefined) => void;
  }) => {
    return (
      <div className="flex justify-between items-center mt-4 p-4 rounded-xl bg-muted/50">
        <QueryFilter>
          <QueryLimit
            labelText="Items per Page"
            limitValue={queryLimit}
            limitOnChange={setQueryLimit}
          />
          <QueryLanguage />
          <QueryId
            elementId="feed-id-query"
            labelText="Filter by Feed"
            placeholder="Feed ID"
            id={queryFeedId}
            onIdChange={setQueryFeedId}
          />
          <QueryId
            elementId="feed-category-id-query"
            labelText="Filter by Category"
            placeholder="Category ID"
            id={queryFeedCategoryId}
            onIdChange={setQueryFeedCategoryId}
          />
          <QuerySort
            labelText="Sort By"
            selectedOption={querySort}
            onOptionChange={setQuerySort}
          />
        </QueryFilter>
        <CreateFeedItem />
      </div>
    );
  }
);

export const FeedItemsList = () => {
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queryLimit, setQueryLimit] = useState<number | undefined>(15);
  const [queryFeedId, setQueryFeedId] = useState<number | undefined>(undefined);
  const [queryFeedCategoryId, setQueryFeedCategoryId] = useState<
    number | undefined
  >(undefined);
  const [querySort, setQuerySort] = useState<string | undefined>(undefined);

  const { data, isLoading, error } = useGetAllFeedItemsQuery({
    limit: queryLimit,
    page: currentPage,
    feed_id: queryFeedId,
    feed_category_id: queryFeedCategoryId,
    lang: selectedLanguage,
    sort: querySort,
  });

  const totalItems = data?.total_items ?? 0;
  const totalPages = Math.ceil(totalItems / (queryLimit ?? 15));
  const items = data?.items;

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ControlBar
          queryLimit={queryLimit}
          setQueryLimit={setQueryLimit}
          queryFeedId={queryFeedId}
          setQueryFeedId={setQueryFeedId}
          queryFeedCategoryId={queryFeedCategoryId}
          setQueryFeedCategoryId={setQueryFeedCategoryId}
          querySort={querySort}
          setQuerySort={setQuerySort}
        />
        <div className="rounded-xl bg-muted/50 p-4">
          <Table>
            <ItemsHeader />
            <TableBody>
              {Array.from({ length: queryLimit || 15 }).map((_, index) => (
                <LoadingSkeleton key={index} />
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
        <ControlBar
          queryLimit={queryLimit}
          setQueryLimit={setQueryLimit}
          queryFeedId={queryFeedId}
          setQueryFeedId={setQueryFeedId}
          queryFeedCategoryId={queryFeedCategoryId}
          setQueryFeedCategoryId={setQueryFeedCategoryId}
          querySort={querySort}
          setQuerySort={setQuerySort}
        />
        <div className="text-center rounded-xl bg-muted/50 p-4">
          ❌ Error fetching Feed Items. Please try again
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <ControlBar
        queryLimit={queryLimit}
        setQueryLimit={setQueryLimit}
        queryFeedId={queryFeedId}
        setQueryFeedId={setQueryFeedId}
        queryFeedCategoryId={queryFeedCategoryId}
        setQueryFeedCategoryId={setQueryFeedCategoryId}
        querySort={querySort}
        setQuerySort={setQuerySort}
      />
      <div className="w-full max-w-full overflow-x-auto rounded-xl bg-muted/50 p-4">
        <Table className="min-w-full">
          <ItemsHeader />
          <TableBody>
            {items?.map((item) => (
              <FeedItem
                key={item.id}
                feedItem={item}
                updateFeature={<UpdateFeedItem updateFeedItemId={item.id} />}
                deleteFeature={
                  <DeleteFeedItem deleteFeedItemId={String(item.id)} />
                }
              />
            ))}
          </TableBody>
          {totalPages > 0 && (
            <ItemsFooter>
              <AppPagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalPages={totalPages}
              />
            </ItemsFooter>
          )}
        </Table>
      </div>
    </div>
  );
};
