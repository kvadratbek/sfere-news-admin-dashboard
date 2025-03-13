import { useState } from "react";
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
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { useCreateFeedItemMutation } from "@/shared/api/feed-items-api";

export const CreateFeedItem = () => {
  const [categoryId, setCategoryId] = useState(0);
  const [content, setContent] = useState("");
  const [feedItemDescription, setFeedItemDescription] = useState("");
  const [feedId, setFeedId] = useState(0);
  const [feedItemLanguage, setFeedItemLanguage] = useState("");
  const [feedItemlink, setFeedItemLink] = useState("");
  const [feedItemPublishedAt, setFeedItemPublishedAt] = useState("");
  const [feedSourceUrl, setFeedSourceUrl] = useState("");
  const [feedSourceTitle, setFeedSourceTitle] = useState("");
  const [feedItemThumbnailAltText, setFeedItemThumbnailAltText] = useState("");
  const [feedItemThumbnailDldUrl, setFeedItemThumbnailDldUrl] = useState("");
  const [feedItemtitle, setFeedItemTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createFeedItem, { isLoading }] = useCreateFeedItemMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const feedItem = {
      category_id: categoryId,
      content: content,
      description: feedItemDescription,
      feed_id: feedId,
      lang: feedItemLanguage,
      link: feedItemlink,
      pulished_at: feedItemPublishedAt,
      soruce_url: feedSourceUrl,
      source_title: feedSourceTitle,
      thumbnails: {
        alt_text: feedItemThumbnailAltText,
        dld_url: feedItemThumbnailDldUrl,
      },
      title: feedItemtitle,
    };

    try {
      const response = await createFeedItem(feedItem).unwrap();
      console.log("Created feed item:", response);
      toast.success("Feed Item created successfully!", {
        description: `Feed Item "${feedItemtitle}" has been created`,
      });
      setShowModal(false);
    } catch (error: unknown) {
      console.error(`Error creating this Feed Item: ${feedItem}`, error);
      toast.error("Failed to create Feed Item", {
        description: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={() => setShowModal(true)}>
          Add Feed Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[550px] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-center">Add New Feed Item</DialogTitle>
          <DialogDescription className="text-center">
            Fill out the form to add a new feed item to the system
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
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
                className="col-span-3"
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
                value={feedItemlink}
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
                value={feedItemtitle}
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
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add"}
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
      </DialogContent>
    </Dialog>
  );
};
