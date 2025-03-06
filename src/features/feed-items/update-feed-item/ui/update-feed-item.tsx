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
  useGetFeedItemByIdQuery,
  useUpdateFeedItemMutation,
} from "@/shared/api/feed-items-api";
import { IUpdateFeedItem } from "../model";

export const UpdateFeedItem = ({ updateFeedItemId }: IUpdateFeedItem) => {
  const { data: feedItemData, isLoading: isFetching } =
    useGetFeedItemByIdQuery(updateFeedItemId);
  const [updateFeedItem, { isLoading: isUpdating }] =
    useUpdateFeedItemMutation();

  const [categoryId, setCategoryId] = useState(0);
  const [itemDescription, setItemDescription] = useState("");
  const [feedId, setFeedId] = useState(0);
  const [language, setLanguage] = useState("");
  const [itemLink, setItemLink] = useState("");
  const [itemTitle, setItemTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Populate form with existing data when feedData is available
  useEffect(() => {
    if (feedItemData) {
      setCategoryId(feedItemData.category_id);
      setItemDescription(feedItemData.description);
      setFeedId(feedItemData.feed_id);
      setLanguage(feedItemData.lang);
      setItemLink(feedItemData.link);
      setItemTitle(feedItemData.title);
    }
  }, [feedItemData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const feedItem = {
      category_id: categoryId,
      description: itemDescription,
      feed_id: feedId,
      lang: language,
      link: itemLink,
      title: itemTitle,
    };

    try {
      await updateFeedItem({ id: updateFeedItemId, item: feedItem }).unwrap();
      toast.success("Feed Item updated successfully!", {
        description: `Feed Item "${feedItem.title}" (ID: ${updateFeedItemId}) has been updated`,
      });
      setShowModal(false);
    } catch (error: unknown) {
      toast.error("Failed to update Feed Item", {
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
          <DialogTitle>Update Feed Item</DialogTitle>
          <DialogDescription>
            Complete the form to update an existing Feed Item
          </DialogDescription>
        </DialogHeader>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
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
              {/* Item Description */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="itemDescription" className="text-center">
                  Content Language
                </Label>
                <Input
                  id="itemDescription"
                  value={itemDescription}
                  placeholder="Enter item's description"
                  onChange={(e) => setItemDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
              {/* Feed ID */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="feedId" className="text-center">
                  Feed ID
                </Label>
                <Input
                  id="feedId"
                  value={updateFeedItemId}
                  className="col-span-3"
                  disabled
                />
              </div>
              {/* Language */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="language" className="text-center">
                  Language
                </Label>
                <Input
                  id="language"
                  value={language}
                  placeholder="en / uz / ru"
                  onChange={(e) => setLanguage(e.target.value)}
                  className="col-span-3"
                />
              </div>
              {/* Item Link */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-link" className="text-center">
                  Content Link
                </Label>
                <Input
                  id="item-link"
                  value={itemLink}
                  placeholder="https://example.com/news/smth-happened"
                  onChange={(e) => setItemLink(e.target.value)}
                  className="col-span-3"
                />
              </div>
              {/* Title */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-title" className="text-center">
                  Item Title
                </Label>
                <Input
                  id="item-title"
                  value={itemTitle}
                  placeholder="Example Title"
                  onChange={(e) => setItemTitle(e.target.value)}
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
                {isUpdating ? "Updating..." : "Update"}
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
