import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { InputBlock } from "./input-block";
import { TextareaBlock } from "./text-area-block";
import {
  useLazyGetFeedByIdQuery,
  useUpdateFeedMutation,
} from "@/shared/api/feeds-api";
import { IUpdateFeed } from "../model";

const emptyTranslation = (feed_id: number) => ({
  id: 0,
  feed_id,
  lang: "",
  title: "",
  description: "",
});

export const UpdateFeed = ({ updateFeedId }: IUpdateFeed) => {
  const [trigger, { data: feedData, isLoading: isFetching }] =
    useLazyGetFeedByIdQuery();
  const [updateFeed, { isLoading: isUpdating }] = useUpdateFeedMutation();

  const [form, setForm] = useState({
    baseUrl: "",
    logoUrl: "",
    priority: 0,
    translations: [emptyTranslation(updateFeedId)],
  });

  const [showModal, setShowModal] = useState(false);

  // Load feed data when modal opens
  useEffect(() => {
    if (showModal) {
      trigger(updateFeedId);
    }
  }, [showModal, updateFeedId, trigger]);

  // Populate form when feedData is fetched
  useEffect(() => {
    if (feedData) {
      setForm({
        baseUrl: feedData.base_url,
        logoUrl: feedData.logo_url,
        priority: feedData.priority,
        translations: feedData.translation?.length
          ? feedData.translation
          : [emptyTranslation(updateFeedId)],
      });
    }
  }, [feedData]);

  const handleTranslationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...form.translations];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, translations: updated });
  };

  const addTranslation = () => {
    setForm((prev) => ({
      ...prev,
      translations: [...prev.translations, emptyTranslation(updateFeedId)],
    }));
  };

  const removeTranslation = (index: number) => {
    if (form.translations.length > 1) {
      setForm((prev) => ({
        ...prev,
        translations: prev.translations.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: updateFeedId,
      base_url: form.baseUrl,
      logo_url: form.logoUrl,
      priority: form.priority,
      max_items: 0, // <- confirm this is correct
      translation: form.translations,
    };

    try {
      await updateFeed({ id: updateFeedId, feed: payload }).unwrap();
      toast.success("Feed updated successfully!", {
        description: `Feed (ID: ${updateFeedId}) has been updated.`,
      });
      setShowModal(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Failed to update feed.", {
        description: error?.message ?? "Unknown error",
      });
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer"
          variant="default"
          disabled={isFetching}
        >
          <Pencil />
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
            {/* Base Fields */}
            <div className="grid gap-4 py-4">
              <InputBlock
                id="baseUrl"
                label="Base URL"
                value={form.baseUrl}
                onChange={(v) => setForm((f) => ({ ...f, baseUrl: v }))}
              />
              <InputBlock
                id="logoUrl"
                label="Logo URL"
                value={form.logoUrl}
                onChange={(v) => setForm((f) => ({ ...f, logoUrl: v }))}
              />
              <InputBlock
                id="priority"
                label="Priority"
                type="number"
                value={form.priority}
                onChange={(v) =>
                  setForm((f) => ({ ...f, priority: Number(v) }))
                }
              />
            </div>

            {/* Translations */}
            {form.translations.map((tr, index) => (
              <div key={index} className="grid gap-4 py-4 border-t pt-4">
                <InputBlock
                  id={`lang-${index}`}
                  label="Language"
                  value={tr.lang}
                  onChange={(v) => handleTranslationChange(index, "lang", v)}
                />
                <InputBlock
                  id={`title-${index}`}
                  label="Title"
                  value={tr.title}
                  onChange={(v) => handleTranslationChange(index, "title", v)}
                />
                <TextareaBlock
                  id={`description-${index}`}
                  label="Description"
                  value={tr.description}
                  onChange={(v) =>
                    handleTranslationChange(index, "description", v)
                  }
                />
                {form.translations.length > 1 && (
                  <Button
                    className="w-full cursor-pointer"
                    type="button"
                    variant="destructive"
                    onClick={() => removeTranslation(index)}
                  >
                    Remove Translation
                  </Button>
                )}
              </div>
            ))}

            <DialogFooter className="mt-4 flex gap-2">
              <Button
                className="w-full cursor-pointer"
                type="button"
                variant="secondary"
                onClick={addTranslation}
                disabled={isUpdating}
              >
                + Translation
              </Button>
              <Button
                className="w-full cursor-pointer"
                type="submit"
                variant="default"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Feed"}
              </Button>
              <Button
                className="w-full cursor-pointer"
                type="button"
                variant="destructive"
                disabled={isUpdating}
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
