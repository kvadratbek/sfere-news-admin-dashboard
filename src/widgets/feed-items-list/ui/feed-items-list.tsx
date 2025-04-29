import { useState, memo, useEffect, useMemo } from "react";

// Custom hook to fetch selected language
const useSelectedLanguage = () => {
  return useSelector((state: RootState) => state.language.selectedLanguage);
};
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useGetAllFeedItemsQuery } from "@/shared/api/feed-items-api";
import { useLazyGetAllFeedsQuery } from "@/shared/api/feeds-api";
import { useLazyGetAllCategoriesQuery } from "@/shared/api/feed-categories-api";
import {
  AppPagination,
  QueryLanguage,
  QueryLimit,
  QuerySelect,
  QuerySort,
} from "@/features";
import {
  CreateFeedItem,
  UpdateFeedItem,
  DeleteFeedItem,
} from "@/features/feed-items";
import { FeedItem, QueryFilter } from "@/entities";
import { Table, TableBody } from "@/shared/ui/table";
import { LoadingSkeleton } from "./loading-skeleton";
import { ItemsHeader } from "./items-header";
import { ItemsFooter } from "./items-footer";
import { IFeedResponse, IGetFeedsParams } from "@/shared/model/feeds";
import {
  ICategoryResponse,
  IGetCategoriesParams,
} from "@/shared/model/feed-categories";
import debounce from "lodash/debounce";
import { useCallback } from "react";

const useFeedsQuery = () => {
  const selectedLanguage = useSelectedLanguage();
  const [triggerGetFeeds, { data, isLoading, error }] =
    useLazyGetAllFeedsQuery();

  const queryParams: IGetFeedsParams = {
    lang: selectedLanguage,
    limit: 100,
    page: 1,
    priority: true,
  };

  const fetchFeeds = useCallback(() => {
    triggerGetFeeds(queryParams);
  }, [triggerGetFeeds, selectedLanguage]);

  return {
    data: data?.feeds ?? [],
    isLoading,
    error,
    fetchFeeds,
  };
};

// Custom hook for fetching categories
const useCategoriesQuery = () => {
  const selectedLanguage = useSelectedLanguage();
  const [triggerGetCategories, { data, isLoading, error }] =
    useLazyGetAllCategoriesQuery();

  const queryParams: IGetCategoriesParams = {
    lang: selectedLanguage,
    limit: 100,
    page: 1,
  };

  const fetchCategories = useCallback(() => {
    triggerGetCategories(queryParams);
  }, [triggerGetCategories, selectedLanguage]);

  return {
    data: data?.categories ?? [],
    isLoading,
    error,
    fetchCategories,
  };
};

// ControlBar component
const ControlBar = memo(
  ({
    queryLimit,
    setQueryLimit,
    queryFeedId,
    setQueryFeedId,
    queryCategoryId,
    setQueryCategoryId,
    querySort,
    setQuerySort,
  }: {
    queryLimit: number | undefined;
    setQueryLimit: (value: number | undefined) => void;
    queryFeedId: number | undefined;
    setQueryFeedId: (value: number | undefined) => void;
    queryCategoryId: number | undefined;
    setQueryCategoryId: (value: number | undefined) => void;
    querySort: string | undefined;
    setQuerySort: (value: string | undefined) => void;
  }) => {
    const selectedLanguage = useSelector(
      (state: RootState) => state.language.selectedLanguage
    );
    const {
      data: feeds,
      isLoading: feedsLoading,
      error: feedsError,
      fetchFeeds,
    } = useFeedsQuery();
    const {
      data: categories,
      isLoading: categoriesLoading,
      error: categoriesError,
      fetchCategories,
    } = useCategoriesQuery();

    const debouncedFetch = useMemo(
      () =>
        debounce(() => {
          fetchFeeds();
          fetchCategories();
        }, 300),
      [fetchFeeds, fetchCategories]
    );

    useEffect(() => {
      debouncedFetch();
      return () => debouncedFetch.cancel();
    }, [selectedLanguage, debouncedFetch]);

    if (feedsError || categoriesError) {
      return (
        <div className="text-center rounded-xl bg-muted/50 p-4">
          ❌ Error fetching filters. Please try again.
        </div>
      );
    }

    return (
      <div className="flex justify-between items-center mt-4 p-4 rounded-xl bg-muted/50">
        <QueryFilter>
          <QueryLimit
            labelText="Items per Page"
            limitValue={queryLimit}
            limitOnChange={setQueryLimit}
          />
          <QueryLanguage />
          <QuerySelect<IFeedResponse, number | undefined, IGetFeedsParams>
            id="feed-id-query"
            elementId="feed-id-query"
            labelText="Items by Feed"
            placeholder="Select Feed"
            value={queryFeedId}
            onValueChange={setQueryFeedId}
            useQueryHook={() => ({
              data: feeds,
              isLoading: feedsLoading,
              error: feedsError,
            })}
            queryParams={{
              lang: selectedLanguage,
              limit: 100,
              page: 1,
              priority: true,
            }}
            getDisplayValue={(feed) =>
              feed.translation[0]?.title || `Feed ${feed.id}`
            }
            getKeyValue={(feed) => feed.id}
            showAllOption
            allOptionValue="none"
            allOptionText="All Feeds"
          />
          <QuerySelect<
            ICategoryResponse,
            number | undefined,
            IGetCategoriesParams
          >
            id="category-id-query"
            elementId="category-id-query"
            labelText="Items by Category"
            placeholder="Select Category"
            value={queryCategoryId}
            onValueChange={setQueryCategoryId}
            useQueryHook={() => ({
              data: categories,
              isLoading: categoriesLoading,
              error: categoriesError,
            })}
            queryParams={{
              lang: selectedLanguage,
              limit: 100,
              page: 1,
            }}
            getDisplayValue={(category) =>
              category.translations?.[0]?.name || `Category ${category.id}`
            }
            getKeyValue={(category) => category.id}
            showAllOption
            allOptionValue="none"
            allOptionText="All Categories"
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

// FeedItemsList remains the same as the previous refactored version
export const FeedItemsList = () => {
  const selectedLanguage = useSelectedLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [queryLimit, setQueryLimit] = useState<number | undefined>(15);
  const [queryFeedId, setQueryFeedId] = useState<number | undefined>(undefined);
  const [queryCategoryId, setQueryCategoryId] = useState<number | undefined>(
    undefined
  );
  const [querySort, setQuerySort] = useState<string | undefined>(undefined);

  const fallbackLimit = 15;

  const { data, isLoading, error } = useGetAllFeedItemsQuery({
    limit: queryLimit ?? fallbackLimit,
    page: currentPage,
    feed_id: queryFeedId,
    feed_category_id: queryCategoryId,
    lang: selectedLanguage,
    sort: querySort,
  });

  const totalItems = data?.total_items ?? 0;
  const totalPages = Math.ceil(totalItems / (queryLimit ?? fallbackLimit));
  const items = data?.items ?? [];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <ControlBar
        queryLimit={queryLimit}
        setQueryLimit={setQueryLimit}
        queryFeedId={queryFeedId}
        setQueryFeedId={setQueryFeedId}
        queryCategoryId={queryCategoryId}
        setQueryCategoryId={setQueryCategoryId}
        querySort={querySort}
        setQuerySort={setQuerySort}
      />
      {isLoading ? (
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
      ) : error ? (
        <div className="text-center rounded-xl bg-muted/50 p-4">
          ❌ Error fetching Feed Items. Please try again.
        </div>
      ) : (
        <div className="w-full max-w-full overflow-x-auto rounded-xl bg-muted/50 p-4">
          <Table className="min-w-full">
            <ItemsHeader />
            <TableBody>
              {items.map((item) => (
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
      )}
    </div>
  );
};
