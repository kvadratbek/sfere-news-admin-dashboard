import { TableCell, TableRow } from "@/shared/ui/table";
import { IContent } from "../model";

export const FeedContent = ({
  content,
  deleteFeature,
  updateFeature,
}: IContent) => {
  return (
    <TableRow key={content.id}>
      <TableCell>{content.id ?? "No Data"}</TableCell>
      <TableCell>{content.feed_id ?? "No Data"}</TableCell>
      <TableCell>{content.category_id ?? "No Data"}</TableCell>
      <TableCell>{content.lang ?? "No Data"}</TableCell>
      <TableCell>{content.link ?? "No Data"}</TableCell>
      <TableCell className="flex flex-row-reverse gap-5" align="right">
        {deleteFeature}
        {updateFeature}
      </TableCell>
    </TableRow>
  );
};
