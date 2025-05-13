import { FC } from "react";
import {
  Table,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
} from "@/shared/ui/table";
import { FeedCategory } from "@/entities";
import { AppPagination } from "@/features";
import { FeedCategoriesListHeader } from "./table-header";
import { UpdateFeedCategory } from "@/features/feed-categories-test";
import { DeleteFeedCategory, FeedCategoriesKeys } from "@/features/feed-categories";
import { ICategoryResponse } from "@/shared/model/feed-categories";

interface FeedCategoriesTableProps {
  categories: ICategoryResponse[] | undefined;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const FeedCategoriesTable: FC<FeedCategoriesTableProps> = ({
  categories,
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="rounded-xl bg-muted/50 p-4">
    <Table className="w-full">
      <FeedCategoriesListHeader />
      <TableBody>
        {categories?.map((category) => (
          <FeedCategory
            key={category.id}
            category={category}
            updateFeature={
              <UpdateFeedCategory updateCategoryId={category.id} />
            }
            deleteFeature={
              <DeleteFeedCategory deleteCategoryId={category.id} />
            }
            viewKeysFeature={<FeedCategoriesKeys category_id={category.id}/> }
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
                onPageChange={onPageChange}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  </div>
);
