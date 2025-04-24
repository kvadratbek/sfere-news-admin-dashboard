import { Button } from "@/shared/ui/button";
import { toast } from "sonner";
import { useDeleteCategoryMutation } from "@/shared/api/feed-categories-api";
import { IDeleteCategory } from "../model";
import { Trash } from "lucide-react";

export const DeleteFeedCategory = ({ deleteCategoryId }: IDeleteCategory) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted successfully!", {
        description: `Category (ID: ${id}) has been removed.`,
      });
    } catch (error: unknown) {
      toast.error("Failed to delete category.", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Button
      className="cursor-pointer"
      onClick={() => handleDelete(deleteCategoryId)}
      variant="destructive"
      disabled={isLoading}
    >
      <Trash />
    </Button>
  );
};
