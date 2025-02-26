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
  useGetFeedContentQuery,
  useUpdateFeedContentMutation,
} from "@/shared/api/feed-contents-api";
import { IUpdateContent } from "../model";

export const UpdateFeedContent = ({ updateContentId }: IUpdateContent) => {
  const { data: contentData, isLoading: isFetching } =
    useGetFeedContentQuery(updateContentId);
  const [updateContent, { isLoading: isUpdating }] =
    useUpdateFeedContentMutation();

  const [categoryId, setCategoryId] = useState(0);
  const [contentLang, setContentLang] = useState("");
  const [contentLink, setContentLink] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Populate form with existing data when feedData is available
  useEffect(() => {
    if (contentData) {
      setCategoryId(contentData.category_id);
      setContentLang(contentData.lang);
      setContentLink(contentData.link);
    }
  }, [contentData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const content = {
      category_id: categoryId,
      lang: contentLang,
      link: contentLink,
    };

    try {
      await updateContent({ id: updateContentId, data: content }).unwrap();
      console.log(content);
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
          className="cursor-pointer min-w-[85px]"
          variant="default"
          disabled={isFetching}
        >
          Update
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
              {/* Feed ID */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="feedId" className="text-center">
                  Feed ID
                </Label>
                <Input
                  id="feedId"
                  value={updateContentId}
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
                {/* Add similar debug info for other inputs */}
                <div>Debug: {contentLang}</div>
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
                className="cursor-pointer"
                variant="default"
                type="submit"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Content"}
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
