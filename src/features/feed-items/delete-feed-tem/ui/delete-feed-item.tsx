import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import { useDeleteFeedItemMutation } from "@/shared/api/feed-items-api";
import { IDeleteFeedItem } from "../model/types";

export const DeleteFeedItem = ({ deleteFeedItemId }: IDeleteFeedItem) => {
  const [deleteFeedItem, { isLoading }] = useDeleteFeedItemMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteFeedItem(id).unwrap();
      toast.success("Feed Item deleted successfully!", {
        description: `Feed Item (ID: ${id}) has been removed`,
      });
    } catch (error: unknown) {
      toast.error("Failed to delete Feed Item", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Button
      className="cursor-pointer min-w-[85px]"
      variant="destructive"
      onClick={() => handleDelete(deleteFeedItemId)}
      disabled={isLoading}
    >
      {isLoading ? "Deleting" : "Delete"}
    </Button>
  );
};
