import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import {
  useGetFeedItemByIdQuery,
  useUpdateFeedItemMutation,
} from "@/shared/api/feed-items-api";
import { IUpdateFeedItem } from "../model/types";
import { Textarea } from "@/shared/ui/textarea";

export const UpdateFeedItem = ({ updateFeedItemId }: IUpdateFeedItem) => {
  const { data: feedItemData, isLoading: isFetching } =
    useGetFeedItemByIdQuery(updateFeedItemId);
  const [updateFeedItem, { isLoading: isUpdating }] =
    useUpdateFeedItemMutation();

  // State for all fields
  const [categoryId, setCategoryId] = useState(0);
  const [content, setContent] = useState("");
  const [feedItemCreatedAt, setFeedItemCreatedAt] = useState("");
  const [feedItemDescription, setFeedItemDescription] = useState("");
  const [feedId, setFeedId] = useState(0);
  const [feedItemId, setFeedItemId] = useState(0);
  const [feedItemLanguage, setFeedItemLanguage] = useState("");
  const [feedItemLink, setFeedItemLink] = useState("");
  const [feedItemPublishedAt, setFeedItemPublishedAt] = useState("");
  const [feedSourceUrl, setFeedSourceUrl] = useState("");
  const [feedSourceTitle, setFeedSourceTitle] = useState("");
  const [feedItemThumbnailAltText, setFeedItemThumbnailAltText] = useState("");
  const [feedItemThumbnailDldUrl, setFeedItemThumbnailDldUrl] = useState("");
  const [feedItemTitle, setFeedItemTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Populate form with existing data when feedItemData is available
  useEffect(() => {
    if (feedItemData) {
      setCategoryId(feedItemData.category_id || 0);
      setContent(feedItemData.content || "");
      setFeedItemCreatedAt(feedItemData.created_at || "No Data");
      setFeedItemDescription(feedItemData.description || "");
      setFeedId(feedItemData.feed_id || 0);
      setFeedItemId(feedItemData.id || 0);
      setFeedItemLanguage(feedItemData.lang || "");
      setFeedItemLink(feedItemData.link || "");
      setFeedItemPublishedAt(feedItemData.pulished_at || ""); // Note: API uses "published_at"
      setFeedSourceUrl(feedItemData.soruce_url || ""); // Note: API uses "source_url"
      setFeedSourceTitle(feedItemData.source_title || ""); // Note: API uses "source_title"
      setFeedItemThumbnailAltText(feedItemData.thumbnails?.alt_text || "");
      setFeedItemThumbnailDldUrl(feedItemData.thumbnails?.dld_url || "");
      setFeedItemTitle(feedItemData.title || "");
    }
  }, [feedItemData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const feedItem = {
      category_id: categoryId,
      content: content,
      description: feedItemDescription,
      feed_id: feedId,
      lang: feedItemLanguage,
      link: feedItemLink,
      pulished_at: feedItemPublishedAt,
      soruce_url: feedSourceUrl,
      source_title: feedSourceTitle,
      thumbnails: {
        alt_text: feedItemThumbnailAltText,
        dld_url: feedItemThumbnailDldUrl,
      },
      title: feedItemTitle,
    };

    try {
      const response = await updateFeedItem({
        id: updateFeedItemId,
        item: feedItem,
      }).unwrap();
      console.log(`Feed Item created successfully. Response: ${response}`);
      toast.success("Feed Item updated successfully!", {
        description: `Feed Item "${feedItemTitle}" (ID: ${updateFeedItemId}) has been updated`,
      });
      setShowModal(false);
    } catch (error: unknown) {
      console.error(
        `Error updating Feed Item (ID: ${updateFeedItemId}):`,
        error
      );
      toast.error("Failed to update Feed Item", {
        description: error instanceof Error ? error.message : "Unknown Error",
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
          {isFetching ? "Loading..." : "Update"}
        </Button>
      </DialogTrigger>
      <DialogContent className="scrollable sm:max-w-[425px] sm:max-h-[550px] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-center">Update Feed Item</DialogTitle>
          <DialogDescription className="text-center">
            Complete the form to update an existing Feed Item
          </DialogDescription>
        </DialogHeader>
        {isFetching ? (
          <p className="text-center">Loading feed item data...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* Category ID */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category-id" className="text-center">
                  Category ID
                </Label>
                <Input
                  type="number"
                  id="category-id"
                  value={categoryId}
                  placeholder="1 / 2 / ..."
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>

              {/* Content */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-center">
                  Content
                </Label>
                <Input
                  id="content"
                  value={content}
                  placeholder="https://content.news.com/rss"
                  onChange={(e) => setContent(e.target.value)}
                  className="col-span-3"
                />
              </div>

              {/* Created At */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-created-at" className="text-center">
                  Created At
                </Label>
                <Input
                  id="item-created-at"
                  value={feedItemCreatedAt}
                  placeholder={feedItemCreatedAt ?? "No Data"}
                  onChange={(e) => setFeedItemCreatedAt(e.target.value)}
                  className="col-span-3"
                  disabled
                />
              </div>

              {/* Description */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-description" className="text-center">
                  Description
                </Label>
                <Textarea
                  id="item-description"
                  value={feedItemDescription}
                  placeholder="Enter the description of the item"
                  onChange={(e) => setFeedItemDescription(e.target.value)}
                  className="col-span-3 h-5 w-full"
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
                  placeholder="1 / 2 / ..."
                  onChange={(e) => setFeedId(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>

              {/* Feed Item ID */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-id" className="text-center">
                  Feed Item ID
                </Label>
                <Input
                  type="number"
                  id="item-id"
                  value={feedItemId}
                  placeholder="1 / 2 / ..."
                  onChange={(e) => setFeedItemId(Number(e.target.value))}
                  className="col-span-3"
                  disabled
                />
              </div>

              {/* Language */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-language" className="text-center">
                  Language
                </Label>
                <Input
                  id="item-language"
                  value={feedItemLanguage}
                  placeholder="uz / en / ru"
                  onChange={(e) => setFeedItemLanguage(e.target.value)}
                  className="col-span-3"
                />
              </div>

              {/* Link */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-link" className="text-center">
                  Item Link
                </Label>
                <Input
                  id="item-link"
                  value={feedItemLink}
                  placeholder="https://example.com/item"
                  onChange={(e) => setFeedItemLink(e.target.value)}
                  className="col-span-3"
                />
              </div>

              {/* Published At */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="published-at" className="text-center">
                  Published At
                </Label>
                <Input
                  id="published-at"
                  value={feedItemPublishedAt}
                  placeholder="Wed, 24 Feb 2016 11:42:23 EST"
                  onChange={(e) => setFeedItemPublishedAt(e.target.value)}
                  className="col-span-3"
                />
              </div>

              {/* Source URL */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="source-url" className="text-center">
                  Source Feed URL
                </Label>
                <Input
                  id="source-url"
                  value={feedSourceUrl}
                  placeholder="https://news.com"
                  onChange={(e) => setFeedSourceUrl(e.target.value)}
                  className="col-span-3"
                />
              </div>

              {/* Source Title */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="source-title" className="text-center">
                  Source Feed Title
                </Label>
                <Input
                  id="source-title"
                  value={feedSourceTitle}
                  placeholder="News / BBC / Kun.uz"
                  onChange={(e) => setFeedSourceTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>

              {/* Thumbnail Alt Text */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="thumbnail-alt-text" className="text-center">
                  Thumbnail Alt Text
                </Label>
                <Input
                  id="thumbnail-alt-text"
                  value={feedItemThumbnailAltText}
                  placeholder="Short Thumbnail Description"
                  onChange={(e) => setFeedItemThumbnailAltText(e.target.value)}
                  className="col-span-3"
                />
              </div>

              {/* Thumbnail Source */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="thumbnail-src" className="text-center">
                  Thumbnail Source
                </Label>
                <Input
                  id="thumbnail-src"
                  value={feedItemThumbnailDldUrl}
                  placeholder="https://example.com/item-thumbnail.png"
                  onChange={(e) => setFeedItemThumbnailDldUrl(e.target.value)}
                  className="col-span-3"
                />
              </div>

              {/* Title */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-title" className="text-center">
                  Title
                </Label>
                <Input
                  id="item-title"
                  value={feedItemTitle}
                  placeholder="Example Title"
                  onChange={(e) => setFeedItemTitle(e.target.value)}
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
