import { useState } from "react";
import { useCreateFeedItemMutation } from "@/shared/api/feed-items-api";
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

export const CreateFeedItem = () => {
  const [categoryId, setCategoryId] = useState(0);
  const [description, setDescription] = useState("");
  const [feedId, setFeedId] = useState(0);
  const [lang, setLang] = useState("");
  const [link, setLink] = useState("");
  // const [thumbnailAltText, setThumbnailAltText] = useState("");
  // const [thumbnailDldUrl, setThumbnailDldUrl] = useState("");
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createFeedItem, { isLoading }] = useCreateFeedItemMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const feedItem = {
      category_id: categoryId,
      description: description,
      feed_id: feedId,
      lang: lang,
      link: link,
      // thumbnails: {
      //   alt_text: thumbnailAltText,
      //   dld_url: thumbnailDldUrl,
      // },
      title: title,
    };

    try {
      const response = await createFeedItem(feedItem).unwrap();
      console.log("Created feed item:", response);
      toast.success("Feed Item created successfully!", {
        description: `Feed Item "${title}" has been created`,
      });
      setShowModal(false);
    } catch (error: unknown) {
      console.error("Error creating Feed Item:", error);
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
              <Label htmlFor="categoryId" className="text-center">
                Category ID
              </Label>
              <Input
                type="number"
                id="categoryId"
                value={categoryId}
                placeholder="1 / 2 / ..."
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            {/* Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-center">
                Description
              </Label>
              <Input
                id="description"
                value={description}
                placeholder="Enter the description of the item"
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            {/* Feed ID */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="feedId" className="text-center">
                Feed ID
              </Label>
              <Input
                type="number"
                id="feedId"
                value={feedId}
                placeholder="1 / 2 / ..."
                onChange={(e) => setFeedId(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            {/* Language */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lang" className="text-center">
                Language
              </Label>
              <Input
                id="lang"
                value={lang}
                placeholder="uz / en / ru"
                onChange={(e) => setLang(e.target.value)}
                className="col-span-3"
              />
            </div>
            {/* Link */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-center">
                Item Link
              </Label>
              <Input
                id="link"
                value={link}
                placeholder="https://example.com/item"
                onChange={(e) => setLink(e.target.value)}
                className="col-span-3"
              />
            </div>
            {/* Thumbnail Alt Text */}
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alt-text" className="text-center">
                Thumbnail Alt Text
              </Label>
              <Input
                id="alt-text"
                value={thumbnailAltText}
                placeholder="Image Description"
                onChange={(e) => setThumbnailAltText(e.target.value)}
                className="col-span-3"
              />
            </div> */}
            {/* Thumbnail Source */}
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="img-src" className="text-center">
                Thumbnail Source
              </Label>
              <Input
                id="img-src"
                value={thumbnailDldUrl}
                placeholder="https://example.com/item-thumbnail.png"
                onChange={(e) => setThumbnailDldUrl(e.target.value)}
                className="col-span-3"
              />
            </div> */}
            {/* Title */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-center">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                placeholder="Example Title"
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              className="cursor-pointer w-[40%]"
              variant="default"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Feed Item"}
            </Button>
            <Button
              className="cursor-pointer w-[40%]"
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
