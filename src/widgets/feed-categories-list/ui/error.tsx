import { FeedCategoriesContainer } from "./container";

export const FeedCategoriesListError = () => {
  return (
    <FeedCategoriesContainer>
      <div className="text-center rounded-xl bg-muted/50 p-4">
        ❌ Error fetching categories. Please try again
      </div>
    </FeedCategoriesContainer>
  );
};
