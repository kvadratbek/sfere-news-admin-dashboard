import { TableCell, TableRow } from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { IFeedItemEntity } from "../model";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/collapsible";

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
      <TableCell>
        <Collapsible className="w-[10vw] space-y-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="cursor-pointer w-[100%]">
              Click to see the Title
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              <a href={feedItem.link} className="underline text-center">
                {feedItem.title ?? "No Data"}
              </a>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </TableCell>
      <TableCell>
        <Collapsible className="w-[25vw] space-y-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="cursor-pointer w-[100%]">
              Click to see the Description
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              {feedItem.description ?? "No Data"}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </TableCell>
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
