import { Button } from "@/shared/ui/button";
import { toast } from "sonner";
import { useDeleteFeedContentMutation } from "@/shared/api/feed-contents-api";
import { IDeleteContent } from "../model";
import { Trash } from "lucide-react";

export const DeleteFeedContent = ({ deleteContentId }: IDeleteContent) => {
  const [deleteContent, { isLoading }] = useDeleteFeedContentMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteContent(id).unwrap();
      toast.success("Feed Content deleted successfully!", {
        description: `Feed Content (ID: ${id}) has been removed.`,
      });
    } catch (error: unknown) {
      toast.error("Failed to delete Feed Content", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Button
      className="cursor-pointer"
      onClick={() => handleDelete(deleteContentId)}
      variant="destructive"
      disabled={isLoading}
    >
      <Trash />
    </Button>
  );
};
