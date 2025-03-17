import { Button } from "@/shared/ui/button";
import { RefreshCcw } from "lucide-react";
import { useLazyRefreshFeedItemsByFeedIdQuery } from "@/shared/api/feeds-api";
import { IRefreshFeedItems } from "../model";

export const RefreshFeedItems = ({ id }: IRefreshFeedItems) => {
  const [refresh, { isFetching }] = useLazyRefreshFeedItemsByFeedIdQuery();

  const handleRefreshClick = () => {
    refresh(id, true); // true forces a refetch even if cached
  };

  return (
    <Button
      onClick={handleRefreshClick}
      disabled={isFetching}
      variant="default"
      className="cursor-pointer disabled:cursor-not-allowed"
    >
      <RefreshCcw className={isFetching ? "animate-spin" : ""} />
    </Button>
  );
};
