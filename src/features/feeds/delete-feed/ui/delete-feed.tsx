import { Button } from "@/shared/ui/button";
import { toast } from "sonner";
import { useDeleteFeedMutation } from "@/shared/api/feeds-api";
import { IDeleteFeed } from "../model";
import { Trash } from "lucide-react";

export const DeleteFeed = ({ deleteFeedId }: IDeleteFeed) => {
  const [deleteFeed, { isLoading }] = useDeleteFeedMutation();

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteFeed(id).unwrap();
      console.log(res)
      toast.success("Feed deleted successfully!", {
        description: `Feed (ID: ${id}) has been removed.`,
      });
    } catch (error: unknown) {
      console.error(error)
      toast.error("Failed to delete feed.", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Button
      className="cursor-pointer"
      onClick={() => handleDelete(deleteFeedId)}
      variant="destructive"
      disabled={isLoading}
    >
      <Trash />
    </Button>
  );
};
