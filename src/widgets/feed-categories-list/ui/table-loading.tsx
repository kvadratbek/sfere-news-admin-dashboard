import { FeedCategoriesContainer } from "./container";
import { FeedCategoriesListHeader } from "./table-header";
import { Table } from "@/shared/ui/table";
import { LoadingTable } from "@/shared/ui/loading-table";

export const FeedCategoriesListLoading = () => {
  return (
    <FeedCategoriesContainer>
      <div className="rounded-xl bg-muted/50 p-4">
        <Table>
          <FeedCategoriesListHeader />
          <LoadingTable tableLength={10} colSpan={6} />
        </Table>
      </div>
    </FeedCategoriesContainer>
  );
};
