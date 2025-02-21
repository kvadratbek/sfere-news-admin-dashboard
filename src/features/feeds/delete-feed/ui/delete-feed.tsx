import { Button } from "@/shared/ui/button";
import { toast } from "sonner";
import { useDeleteFeedMutation } from "@/shared/api/feeds-api";
import { IDeleteFeed } from "../model";

export const DeleteFeed = ({ deleteFeedId }: IDeleteFeed) => {
  const [deleteFeed, { isLoading }] = useDeleteFeedMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteFeed(id).unwrap();
      toast.success("Feed deleted successfully!", {
        description: `Feed (ID: ${id}) has been removed.`,
      });
    } catch (error: unknown) {
      toast.error("Failed to delete feed.", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Button
      className="cursor-pointer min-w-[85px]"
      onClick={() => handleDelete(deleteFeedId)}
      variant="destructive"
      disabled={isLoading}
    >
      {isLoading ? "Deleting" : "Delete"}
    </Button>
  );
};
