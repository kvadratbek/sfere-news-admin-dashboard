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
  

  const { data, isLoading, error } = useGetAllCategoriesQuery({
    limit: queryLimit,
    page: currentPage,
    lang: selectedLanguage,
  });
  const totalItems = data?.count ?? 0;
  const totalPages = Math.ceil(totalItems / (queryLimit ?? 15))


  return {
    dataCategories: data?.categories,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    queryLimit,
    setQueryLimit,
    totalPages,
  };
};
