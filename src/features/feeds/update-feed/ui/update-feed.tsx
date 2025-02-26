import { useState, useEffect } from "react";
import {
  useGetFeedByIdQuery,
  useUpdateFeedMutation,
} from "@/shared/api/feeds-api";
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
import { Textarea } from "@/shared/ui/textarea";
import { toast } from "sonner";
import { IUpdateFeed } from "../model";

export const UpdateFeed = ({ updateFeedId }: IUpdateFeed) => {
  const { data: feedData, isLoading: isFetching } =
    useGetFeedByIdQuery(updateFeedId);
  const [updateFeed, { isLoading: isUpdating }] = useUpdateFeedMutation();

  const [baseUrl, setBaseUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [priority, setPriority] = useState(0);
  const [translations, setTranslations] = useState([
    { id: 0, feed_id: 0, lang: "", title: "", description: "" },
  ]);
  const [showModal, setShowModal] = useState(false);

  // Populate form with existing data when feedData is available
  useEffect(() => {
    if (feedData) {
      setBaseUrl(feedData.base_url);
      setLogoUrl(feedData.logo_url);
      setPriority(feedData.priority);
      setTranslations(feedData.translation || []);
    }
  }, [feedData]);

  // Add a new translation block
  const handleAddTranslation = () => {
    setTranslations([
      ...translations,
      { id: 0, feed_id: updateFeedId, lang: "", title: "", description: "" },
    ]);
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

    const feed = {
      id: updateFeedId,
      base_url: baseUrl,
      logo_url: logoUrl,
      max_items: 0, // Ensure this field is correct
      priority,
      translation: translations,
    };

    try {
      await updateFeed({ id: updateFeedId, feed }).unwrap();
      toast.success("Feed updated successfully!", {
        description: `Feed (ID: ${updateFeedId}) has been updated.`,
      });
      setShowModal(false);
    } catch (error: unknown) {
      toast.error("Failed to update feed.", {
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
          <DialogTitle>Update Feed</DialogTitle>
          <DialogDescription>
            Complete the form to update an existing Feed
          </DialogDescription>
        </DialogHeader>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="baseUrl" className="text-center">
                  Base URL
                </Label>
                <Input
                  id="baseUrl"
                  value={baseUrl}
                  placeholder="https://example.com"
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="logoUrl" className="text-center">
                  Logo URL
                </Label>
                <Input
                  id="logoUrl"
                  value={logoUrl}
                  placeholder="https://example.com/logo.png"
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-center">
                  Priority
                </Label>
                <Input
                  id="priority"
                  type="number"
                  value={priority}
                  onChange={(e) => setPriority(Number(e.target.value))}
                  className="col-span-3"
                  required
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
                    placeholder="en / uz / ru / ..."
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
                    Title
                  </Label>
                  <Input
                    id={`title-${index}`}
                    placeholder="Example Feed"
                    value={translation.title}
                    onChange={(e) =>
                      handleTranslationChange(index, "title", e.target.value)
                    }
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor={`description-${index}`}
                    className="text-center"
                  >
                    Description
                  </Label>
                  <Textarea
                    id={`description-${index}`}
                    placeholder="Description..."
                    value={translation.description}
                    onChange={(e) =>
                      handleTranslationChange(
                        index,
                        "description",
                        e.target.value
                      )
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
