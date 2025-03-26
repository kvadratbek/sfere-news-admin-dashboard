import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { TableCell, TableRow } from "@/shared/ui/table";
import { ICategory } from "../model";

export const FeedCategory = ({
  category,
  deleteFeature,
  updateFeature,
}: ICategory) => {
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );

  const prioritizedTranslation = category.translations.find(
    (t) => t.lang === selectedLanguage
  );

  return (
    <TableRow key={category.id}>
      <TableCell>{category.id ?? "No Data"}</TableCell>
      <TableCell>{prioritizedTranslation?.lang ?? "No Data"}</TableCell>
      <TableCell>
        <img src={category.icon_url} alt="Icon" width={32} height={32} />
      </TableCell>
      <TableCell>{prioritizedTranslation?.name ?? "No Data"}</TableCell>
      <TableCell className="flex flex-row-reverse gap-5" align="right">
        {updateFeature} {deleteFeature}
      </TableCell>
    </TableRow>
  );
};
