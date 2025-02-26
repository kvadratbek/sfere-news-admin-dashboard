import { useState, useEffect } from "react";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "@/shared/api/feed-categories-api";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { toast } from "sonner";
import { IUpdateCategory } from "../model";

export const UpdateFeedCategory = ({ updateCategoryId }: IUpdateCategory) => {
  const { data: categoryData, isLoading: isFetching } =
    useGetCategoryByIdQuery(updateCategoryId);
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const [iconId, setIconId] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [translations, setTranslations] = useState([{ lang: "", name: "" }]);
  const [showModal, setShowModal] = useState(false);

  // Populate form with existing data when feedData is available
  useEffect(() => {
    if (categoryData) {
      setIconId(categoryData.icon_id);
      setIconUrl(categoryData.icon_url);
      setTranslations(categoryData.translations || []);
    }
  }, [categoryData]);

  // Add a new translation block
  const handleAddTranslation = () => {
    setTranslations([...translations, { lang: "", name: "" }]);
  };

  // Remove a translation block by index
  const handleRemoveTranslation = (index: number) => {
    if (translations.length > 1) {
      setTranslations(translations.filter((_, i) => i !== index));
    }
  };

  // Update translation values
  const handleTranslationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedTranslations = [...translations];
    updatedTranslations[index] = {
      ...updatedTranslations[index],
      [field]: value,
    };
    setTranslations(updatedTranslations);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const category = {
      id: updateCategoryId,
      icon_id: iconId,
      icon_url: iconUrl,
      translations: translations,
    };

    try {
      await updateCategory({ id: updateCategoryId, category }).unwrap();
      toast.success("Category updated successfully!", {
        description: `Feed (ID: ${updateCategoryId}) has been updated`,
      });
      setShowModal(false);
    } catch (error: unknown) {
      toast.error("Failed to update category", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer min-w-[85px]"
          variant="default"
          disabled={isFetching}
        >
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[550px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Update Feed Category</DialogTitle>
          <DialogDescription>
            Complete the form to update an existing Feed Category
          </DialogDescription>
        </DialogHeader>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-center">
                  Category ID
                </Label>
                <Input
                  id="id"
                  value={updateCategoryId}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="iconId" className="text-center">
                  Icon ID
                </Label>
                <Input
                  id="iconId"
                  value={iconId}
                  placeholder={iconId ?? "No Data"}
                  onChange={(e) => setIconId(e.target.value)}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="iconUrl" className="text-center">
                  Icon URL
                </Label>
                <Input
                  id="iconUrl"
                  value={iconUrl}
                  placeholder="https://example.com/icon.png"
                  onChange={(e) => setIconUrl(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>

            {/* Dynamic Translation Inputs */}
            {translations.map((translation, index) => (
              <div key={index} className="grid gap-4 py-4 pt-4 relative">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`lang-${index}`} className="text-center">
                    Language
                  </Label>
                  <Input
                    id={`lang-${index}`}
                    placeholder="en / uz / ru"
                    value={translation.lang}
                    onChange={(e) =>
                      handleTranslationChange(index, "lang", e.target.value)
                    }
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`title-${index}`} className="text-center">
                    Name
                  </Label>
                  <Input
                    id={`title-${index}`}
                    placeholder="Example Feed"
                    value={translation.name}
                    onChange={(e) =>
                      handleTranslationChange(index, "name", e.target.value)
                    }
                    className="col-span-3"
                    required
                  />
                </div>

                {/* Remove Button */}
                {translations.length > 1 && (
                  <Button
                    className="cursor-pointer"
                    type="button"
                    variant="destructive"
                    onClick={() => handleRemoveTranslation(index)}
                  >
                    Remove Translation Block
                  </Button>
                )}
              </div>
            ))}

            <DialogFooter className="mt-4">
              <Button
                className="cursor-pointer"
                variant="secondary"
                type="button"
                onClick={handleAddTranslation}
                disabled={isUpdating}
              >
                + Translation
              </Button>
              <Button
                className="cursor-pointer"
                variant="default"
                type="submit"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Feed"}
              </Button>
              <Button
                className="cursor-pointer"
                variant="destructive"
                type="reset"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
