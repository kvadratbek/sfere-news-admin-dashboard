import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { toast } from "sonner";
import {
  useLazyGetFeedContentQuery,
  useUpdateFeedContentMutation,
} from "@/shared/api/feed-contents-api";
import { IUpdateContent } from "../model";
import { Pencil } from "lucide-react";

export const UpdateFeedContent = ({ updateContentId }: IUpdateContent) => {
  const [trigger, { data: contentData, isLoading: isFetching }] =
    useLazyGetFeedContentQuery();
  const [updateContent, { isLoading: isUpdating }] =
    useUpdateFeedContentMutation();

  const [feedId, setFeedId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [contentLang, setContentLang] = useState("");
  const [contentLink, setContentLink] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal && updateContentId) {
      trigger(updateContentId);
    }
  }, [showModal, updateContentId, trigger]);

  useEffect(() => {
    if (contentData) {
      setFeedId(contentData.feed_id);
      setCategoryId(contentData.category_id);
      setContentLang(contentData.lang);
      setContentLink(contentData.link);
    }
  }, [contentData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const content = {
      feed_id: feedId,
      category_id: categoryId,
      lang: contentLang,
      link: contentLink,
    };

    try {
      await updateContent({ id: updateContentId, data: content }).unwrap();
      toast.success("Feed Content updated successfully!", {
        description: `Feed Content (ID: ${updateContentId}) has been updated`,
      });
      setShowModal(false);
    } catch (error: unknown) {
      toast.error("Failed to update Feed Content", {
        description: error instanceof Error ? error.message : "Unknown error",
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
          <DialogTitle>Update Feed Content</DialogTitle>
          <DialogDescription>
            Complete the form to update an existing Feed Content
          </DialogDescription>
        </DialogHeader>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* Feed Content ID */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="feedContentId" className="text-center">
                  Feed Content ID
                </Label>
                <Input
                  id="feedContentId"
                  value={updateContentId}
                  className="col-span-3"
                  disabled
                />
              </div>
              {/* Feed ID */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="feed-id" className="text-center">
                  Feed ID
                </Label>
                <Input
                  type="number"
                  id="feed-id"
                  value={feedId}
                  onChange={(e) => setFeedId(Number(e.target.value))}
                  className="col-span-3"
                  disabled
                />
              </div>
              {/* Category ID */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categoryId" className="text-center">
                  Category ID
                </Label>
                <Input
                  type="number"
                  id="categoryId"
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              {/* Content Language */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contentLang" className="text-center">
                  Content Language
                </Label>
                <Input
                  id="contentLang"
                  value={contentLang}
                  placeholder="en / uz / ru"
                  onChange={(e) => setContentLang(e.target.value)}
                  className="col-span-3"
                />
              </div>
              {/* Content Link */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contentLink" className="text-center">
                  Content Link
                </Label>
                <Input
                  id="contentLink"
                  value={contentLink}
                  placeholder="https://example.com/rss/"
                  onChange={(e) => setContentLink(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button
                className="cursor-pointer w-full"
                variant="default"
                type="submit"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
              </Button>
              <Button
                className="cursor-pointer w-full"
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
