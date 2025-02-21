import { RootState } from "@/app/store";
import { useGetAllFeedsQuery } from "@/shared/api/feeds-api";
import { useSelector } from "react-redux";

export const CalculatePagesNumber = () => {
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );

  const { data } = useGetAllFeedsQuery({
    limit: 999999,
    page: 1,
    priority: false,
    lang: selectedLanguage,
  });

  const feeds = data || [];
  const totalItemsNumber = feeds.length;
  const pagesPerItems = totalItemsNumber / 10;
  const totalPagesNumber = Math.ceil(pagesPerItems);

  return totalPagesNumber;
};
