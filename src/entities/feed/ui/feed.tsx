import { TableCell, TableRow } from "@/shared/ui/table";
import { IFeedProps } from "../model";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Button } from "@/shared/ui/button";

export const Feed = ({
  feed,
  viewContentsFeature,
  deleteFeature,
  updateFeature,
}: IFeedProps) => {
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );

  const prioritizedTranslation = feed.translation.find(
    (t) => t.lang === selectedLanguage
  );

  return (
    <TableRow key={feed.id}>
      <TableCell>{feed.id}</TableCell>
      <TableCell>{feed.priority ?? "No Data"}</TableCell>
      <TableCell>{prioritizedTranslation?.lang ?? "Unknown"}</TableCell>
      <TableCell>
        <img src={feed.logo_url} alt="Feed Logo" width={40} height={40} />
      </TableCell>
      <TableCell>
        <a href={feed.base_url} target="_blank">
          <Button variant="ghost" className="cursor-pointer">
            {prioritizedTranslation?.title ?? "No title"}
          </Button>
        </a>
      </TableCell>
      <TableCell>
        {prioritizedTranslation?.description ?? "No description"}
      </TableCell>
      <TableCell>{viewContentsFeature}</TableCell>
      <TableCell>{updateFeature}</TableCell>
      <TableCell>{deleteFeature}</TableCell>
    </TableRow>
  );
};
