import { Button } from "@/shared/ui/button";
import { toast } from "sonner";
import { useDeleteFeedContentMutation } from "@/shared/api/feed-content-api";
import { IDeleteContent } from "../model";

export const DeleteContent = ({ deleteContentId }: IDeleteContent) => {
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
      className="cursor-pointer min-w-[85px]"
      onClick={() => handleDelete(deleteContentId)}
      variant="destructive"
      disabled={isLoading}
    >
      {isLoading ? "Deleting" : "Delete"}
    </Button>
  );
};
