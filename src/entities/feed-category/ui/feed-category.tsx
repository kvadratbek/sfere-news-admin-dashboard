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

  const baseIconUrl =
    "https://api1.sfere.pro/v1/admin/feeds/categories/icon?icon_name=";

  return (
    <TableRow key={category.id}>
      <TableCell>{category.id ?? "No Data"}</TableCell>
      <TableCell>{prioritizedTranslation?.lang ?? "No Data"}</TableCell>
      <TableCell>
        <img
          src={`${baseIconUrl}${category.icon_id}`}
          alt="Icon"
          width={32}
          height={32}
        />
      </TableCell>
      <TableCell>{prioritizedTranslation?.name ?? "No Data"}</TableCell>
      <TableCell className="flex flex-row-reverse gap-5" align="right">
        {deleteFeature} {updateFeature}
      </TableCell>
    </TableRow>
  );
};
