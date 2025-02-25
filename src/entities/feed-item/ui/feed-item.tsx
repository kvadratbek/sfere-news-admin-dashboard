import { TableCell, TableRow } from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { IFeedItemEntity } from "../model";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";

export const FeedItem = ({
  feedItem,
  deleteFeature,
  updateFeature,
}: IFeedItemEntity) => {
  return (
    <TableRow key={feedItem.id}>
      <TableCell>{feedItem.id ?? "No Data"}</TableCell>
      <TableCell>{feedItem.feed_id ?? "No Data"}</TableCell>
      <TableCell>{feedItem.category_id ?? "No Data"}</TableCell>
      <TableCell className="w-[10%]">
        <a
          href={feedItem.link}
          target="_blank"
          className="cursor-pointer text-center underline"
        >
          {feedItem.title ?? "No Data"}
        </a>
      </TableCell>
      <TableCell>{feedItem.description ?? "No Data"}</TableCell>
      <TableCell>{feedItem.lang ?? "No Data"}</TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="cursor-pointer">
              Thumbnail
            </Button>
          </DialogTrigger>
          <DialogContent>
            <img
              src={feedItem.thumbnails.dld_url}
              width={feedItem.thumbnails.width}
              height={feedItem.thumbnails.height}
              alt={feedItem.thumbnails.alt_text}
              className="p-5"
            />
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell>{updateFeature}</TableCell>
      <TableCell>{deleteFeature}</TableCell>
    </TableRow>
  );
};
