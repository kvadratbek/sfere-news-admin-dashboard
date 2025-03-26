import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useGetAllCategoriesQuery } from "@/shared/api/feed-categories-api";

export const useFeedCategories = () => {
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [queryLimit, setQueryLimit] = useState<number | undefined>(15);
  const totalPages = 1;

  const { data, isLoading, error } = useGetAllCategoriesQuery({
    limit: queryLimit,
    page: 1,
    lang: selectedLanguage,
  });

  return {
    dataCategories: data,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    queryLimit,
    setQueryLimit,
    totalPages,
  };
};
