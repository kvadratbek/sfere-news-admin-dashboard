import { useState } from "react";
import { useCreateCategoryMutation } from "@/shared/api/feed-categories-api";
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

export const CreateCategory = () => {
  const [iconUrl, setIconUrl] = useState("");
  const [translations, setTranslations] = useState([{ lang: "", name: "" }]);
  const [showModal, setShowModal] = useState(false);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

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
      icon_url: iconUrl,
      translations: translations,
    };

    try {
      const response = await createCategory(category).unwrap();
      console.log("Created feed:", response);
      setShowModal(false);
    } catch (err) {
      console.error("Error creating feed:", err);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={() => setShowModal(true)}>
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[550px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Add New Feed</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new feed to the system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="logoUrl" className="text-center">
                Icon URL
              </Label>
              <Input
                id="iconUrl"
                value={iconUrl}
                placeholder="https://example.com/logo.png"
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
                  placeholder="uz / en / ru"
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
                  placeholder="Example Category"
                  value={translation.name}
                  onChange={(e) =>
                    handleTranslationChange(index, "name", e.target.value)
                  }
                  className="col-span-3"
                  required
                />
              </div>

              {/* Remove Button (hidden for the first translation block) */}
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
              disabled={isLoading}
            >
              + Translation
            </Button>
            <Button
              className="cursor-pointer"
              variant="default"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Category"}
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
      </DialogContent>
    </Dialog>
  );
};
