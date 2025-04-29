import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import { Trash } from "lucide-react";
import { useDeleteFeedMutation } from "@/shared/api/feeds-api";
import { IDeleteFeed } from "../model";
import { Dialog, DialogContent, DialogDescription } from "@/shared/ui/dialog";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";

export const DeleteFeed = ({ deleteFeedId }: IDeleteFeed) => {
  const [deleteFeed, { isLoading }] = useDeleteFeedMutation();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      await deleteFeed(id).unwrap();
      setShowModal(false);
      toast.success("Feed deleted successfully!", {
        description: `Feed (ID: ${id}) has been removed.`,
      });
    } catch (error: unknown) {
      setShowModal(false);
      toast.error("Failed to delete feed.", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer"
          variant="destructive"
          disabled={isLoading}
        >
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogTitle>Delete Feed</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this feed? This action cannot be
          undone
        </DialogDescription>
        <div className="flex justify-between gap-2">
          <Button
            variant="default"
            className="w-full cursor-pointer"
            onClick={() => setShowModal(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="w-full cursor-pointer"
            onClick={() => handleDelete(deleteFeedId)}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
