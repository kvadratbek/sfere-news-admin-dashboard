import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useGetAllFeedsQuery } from "@/shared/api/feeds-api";

export const useFeedsList = () => {
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [queryLimit, setQueryLimit] = useState<number | undefined>(15);
  const [queryPriority, setQueryPriority] = useState(true);

  const { data, isLoading, error } = useGetAllFeedsQuery({
    limit: queryLimit,
    page: currentPage,
    priority: queryPriority,
    lang: selectedLanguage,
  });
  const totalItems = data?.count ?? 0;
  const totalPages = Math.ceil(totalItems / (queryLimit ?? 15));



  return {
    feeds: data?.feeds,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    queryLimit,
    setQueryLimit,
    queryPriority,
    toggleQueryPriority: () => setQueryPriority((prev) => !prev),
    selectedLanguage,
    totalPages: totalPages,
  };
};
