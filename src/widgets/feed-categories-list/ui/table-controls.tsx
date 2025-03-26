import { FC } from "react";
import { QueryFilter } from "@/entities";
import { QueryLimit, QueryLanguage } from "@/features";
import { CreateFeedCategory } from "@/features/feed-categories";

interface FeedCategoriesControlsProps {
  queryLimit: number | undefined;
  setQueryLimit: (limit: number | undefined) => void;
}

export const FeedCategoriesControls: FC<FeedCategoriesControlsProps> = ({
  queryLimit,
  setQueryLimit,
}) => (
  <div className="flex justify-between items-center mt-4 p-4 rounded-xl bg-muted/50">
    <QueryFilter>
      <QueryLimit
        labelText="Categories per Page"
        limitValue={queryLimit}
        limitOnChange={setQueryLimit}
      />
      <QueryLanguage />
    </QueryFilter>
    <CreateFeedCategory />
  </div>
);
