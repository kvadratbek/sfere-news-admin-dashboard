import { TableCell, TableRow } from "@/shared/ui/table";
import { IFeedCatgoryKeysContent } from "../model";


export const FeedCategoryKeys = ({
  content,
  deleteFeature,
  updateFeature,
}: IFeedCatgoryKeysContent) => {
  return (
    <TableRow >
      <TableCell>{content.category_id ?? "No Data"}</TableCell>
      {/* <TableCell>
        {content.name ?? "No Data"} | ID: {content.id ?? "No Data"}
      </TableCell> */}
      {/* <TableCell>{content.feed_id ?? "No Data"}</TableCell> */}
      {/* <TableCell>
        {content.name ?? "No Data"} | ID:{" "}
        {content.category_id ?? "No Data"}
      </TableCell> */}
      {/* <TableCell>{content.category_id ?? "No Data"}</TableCell> */}
      {/* <TableCell>{content.lang ?? "No Data"}</TableCell>
      <TableCell>{content.name ?? "No Data"}</TableCell> */}
      {/* <TableCell className="flex flex-row-reverse gap-5" align="right">
        {deleteFeature}
        {updateFeature}
      </TableCell> */}
    </TableRow>
  );
};