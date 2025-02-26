import { useState } from "react";
import { useCreateFeedContentMutation } from "@/shared/api/feed-contents-api";
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

export const CreateFeedContent = () => {
  const [categoryId, setCategoryId] = useState(0);
  const [feedId, setFeedId] = useState(0);
  const [contentId] = useState(0);
  const [contentLang, setContentLang] = useState("");
  const [contentLink, setContentLink] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createContent, { isLoading }] = useCreateFeedContentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const content = {
      category_id: categoryId,
      feed_id: feedId,
      id: contentId,
      lang: contentLang,
      link: contentLink,
    };

    try {
      const response = await createContent(content).unwrap();
      console.log("Created feed content:", response);
      toast.success("Feed Content created successfully!", {
        description: `Feed Content (Feed ID: ${feedId}, Category ID: ${categoryId}) has been created`,
      });
      setShowModal(false);
    } catch (error: unknown) {
      console.error("Error creating feed content:", error);
      toast.error("Failed to create Feed Content", {
        description: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={() => setShowModal(true)}>
          Add Content
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[550px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Add new Feed Content</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new Feed Content to the system
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
              className="cursor-pointer"
              variant="default"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Content"}
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
