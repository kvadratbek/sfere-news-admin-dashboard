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
import { FeedCategory, QueryFilter } from "@/entities";
import { AppPagination, QueryLanguage, QueryLimit } from "@/features";
import {
  UpdateFeedCategory,
  DeleteFeedCategory,
  CreateFeedCategory,
} from "@/features/feed-categories";
import { useGetAllCategoriesQuery } from "@/shared/api/feed-categories-api";

export const FeedCategoriesList = () => {
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [queryLimit, setQueryLimit] = useState(100);
  const totalPages = 1;
  const { data, isLoading, error } = useGetAllCategoriesQuery({
    limit: queryLimit,
    page: 1,
    lang: selectedLanguage,
  });
  const dataCategories = data;

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="rounded-xl bg-muted/50 p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Lang</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={2}>
                    <Skeleton className="h-[20.8px] w-[full] m-[5px]" />
                  </TableCell>
                  <TableCell colSpan={4}>
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
          ❌ Error fetching categories. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex justify-between items-center mt-4 p-4 rounded-xl bg-muted/50">
        <QueryFilter>
          <QueryLimit
            labelText="Categories per Page"
            limitValue={queryLimit}
            limitOnChange={(e) => setQueryLimit(Number(e.target.value))}
          />
          <QueryLanguage />
        </QueryFilter>
        <CreateFeedCategory />
      </div>
      <div className="rounded-xl bg-muted/50 p-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Lang</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataCategories?.map((category) => (
              <FeedCategory
                key={category.id}
                category={category}
                updateFeature={
                  <UpdateFeedCategory updateCategoryId={category.id} />
                }
                deleteFeature={
                  <DeleteFeedCategory deleteCategoryId={category.id} />
                }
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
