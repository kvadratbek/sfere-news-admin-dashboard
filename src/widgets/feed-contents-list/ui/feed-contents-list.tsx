import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
} from "@/shared/ui/table";
import { FeedContent, QueryFilter } from "@/entities";
import {
  UpdateFeedContent,
  DeleteFeedContent,
  CreateFeedContent,
} from "@/features/feed-contents";
import { QueryLanguage, QuerySelect } from "@/features";
import { LoadingSkeleton } from "./loading-skeleton";
import { useGetAllFeedContentsQuery } from "@/shared/api/feed-contents-api";
import { IGetAllContentsParams } from "@/shared/model/feed-contents";
import { TABLE_HEADERS } from "../model";
import {
  ICategoryResponse,
  IGetCategoriesParams,
} from "@/shared/model/feed-categories";
import { useGetAllCategoriesQuery } from "@/shared/api/feed-categories-api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ContentsTable = ({ contents }: { contents: any[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        {TABLE_HEADERS.map((header) => (
          <TableHead key={header}>{header}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {contents.map((content) => (
        <FeedContent
          key={content.id}
          content={content}
          updateFeature={<UpdateFeedContent updateContentId={content.id} />}
          deleteFeature={<DeleteFeedContent deleteContentId={content.id} />}
        />
      ))}
    </TableBody>
  </Table>
);

export const FeedContentsList = () => {
  const { feedId } = useParams<{ feedId: string }>();
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

  const queryParams: IGetAllContentsParams = {
    feedId: feedId!,
    lang: selectedLanguage,
    categoryId: String(categoryId),
  };

  const { data, isLoading, error } = useGetAllFeedContentsQuery(queryParams, {
    skip: !feedId,
  });

  // Call useGetAllCategoriesQuery at the top level
  const categoryQueryParams: IGetCategoriesParams = {
    limit: 100,
    page: 1,
    lang: selectedLanguage,
  };
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useGetAllCategoriesQuery(categoryQueryParams);

  // Transform data to match QuerySelect's expected type (ICategoryResponse[])
  const transformedData = useMemo(() => {
    return categoryData?.categories ?? [];
  }, [categoryData]);

  // Create a query hook that returns the transformed data
  const queryHook = useMemo(
    () => () => // args: IGetCategoriesParams | typeof skipToken,
    // options?: Record<string, unknown>
    ({
      data: transformedData,
      isLoading: isCategoryLoading,
      error: categoryError,
    }),
    [transformedData, isCategoryLoading, categoryError]
  );

  const dataContents = data?.feedContents.contents;

  const renderContent = () => {
    if (!feedId) {
      return (
        <div className="text-center">
          ❗No Feed ID provided. Please select a feed
        </div>
      );
    }

    if (isLoading) {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              {TABLE_HEADERS.map((header, index) => (
                <TableHead
                  key={header}
                  className={
                    index === TABLE_HEADERS.length - 1 ? "text-right" : ""
                  }
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </TableBody>
        </Table>
      );
    }

    if (error) {
      return (
        <div className="text-center">
          ❌ Error fetching contents for Feed ID: {feedId}. Please try again
        </div>
      );
    }

    if (!dataContents || dataContents.length === 0) {
      return (
        <div className="flex justify-center items-center rounded-xl p-4 text-center">
          ⚠️ No contents available for Feed ID: {feedId} with specified
          parameters
        </div>
      );
    }

    return <ContentsTable contents={dataContents} />;
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex justify-between items-center mt-4 p-4 rounded-xl bg-muted/50">
        <QueryFilter>
          <QuerySelect<
            ICategoryResponse,
            number | undefined,
            IGetCategoriesParams
          >
            labelText="Categories"
            id="category-id-filter"
            value={categoryId}
            elementId="category-id-filter"
            placeholder="Select category"
            onValueChange={setCategoryId}
            useQueryHook={queryHook}
            queryParams={categoryQueryParams}
            getDisplayValue={(category) =>
              category.translations[0]?.name || `Category ${category.id}`
            }
            getKeyValue={(category) => category.id}
            showAllOption={true}
            allOptionValue="none"
            allOptionText="All Categories"
          />
          <QueryLanguage />
        </QueryFilter>
        <CreateFeedContent />
      </div>
      <div className="rounded-xl bg-muted/50 p-4">{renderContent()}</div>
    </div>
  );
};
