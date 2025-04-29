import { FeedCategoriesListLoading } from "./table-loading";
import { FeedCategoriesListError } from "./error";
import { FeedCategoriesContainer } from "./container";
import { FeedCategoriesTable } from "./table";
import { FeedCategoriesControls } from "./table-controls";
import { useFeedCategories } from "../model";

export const FeedCategoriesList = () => {
  const {
    dataCategories,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    queryLimit,
    setQueryLimit,
    totalPages,
  } = useFeedCategories();

  return (
    <FeedCategoriesContainer>
      <FeedCategoriesControls
        queryLimit={queryLimit}
        setQueryLimit={setQueryLimit}
      />
      {isLoading ? (
        <FeedCategoriesListLoading />
      ) : error ? (
        <FeedCategoriesListError />
      ) : (
        <FeedCategoriesTable
          categories={dataCategories}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </FeedCategoriesContainer>
  );
};
