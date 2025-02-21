import { Button } from "@/shared/ui/button";
import { toast } from "sonner";
import { useDeleteCategoryMutation } from "@/shared/api/feed-categories-api";
import { IDeleteCategory } from "../model";

export const DeleteCategory = ({ deleteCategoryId }: IDeleteCategory) => {
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
      className="cursor-pointer min-w-[85px]"
      onClick={() => handleDelete(deleteCategoryId)}
      variant="destructive"
      disabled={isLoading}
    >
      {isLoading ? "Deleting" : "Delete"}
    </Button>
  );
};
