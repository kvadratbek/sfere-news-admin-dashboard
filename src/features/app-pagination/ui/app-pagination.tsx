import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination"; // Adjust path as needed
import { AppPaginationProps } from "../model";

export const AppPagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: AppPaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages: (number | string)[] = [];
    const halfWindow = Math.floor(maxPagesToShow / 2);

    // Ensure totalPages is an integer
    const safeTotalPages = Math.ceil(totalPages);

    // Calculate start and end pages
    let startPage = Math.max(1, currentPage - halfWindow);
    let endPage = Math.min(safeTotalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if near the end to always show maxPagesToShow pages (if possible)
    if (
      endPage - startPage + 1 < maxPagesToShow &&
      safeTotalPages >= maxPagesToShow
    ) {
      startPage = Math.max(1, safeTotalPages - maxPagesToShow + 1);
      endPage = safeTotalPages;
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add first page and ellipsis if needed
    if (startPage > 2) {
      pages.unshift("ellipsis-start");
      pages.unshift(1);
    } else if (startPage === 2) {
      pages.unshift(1);
    }

    // Add last page and ellipsis if needed
    if (endPage < safeTotalPages - 1) {
      pages.push("ellipsis-end");
      pages.push(safeTotalPages);
    } else if (endPage === safeTotalPages - 1) {
      pages.push(safeTotalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap justify-center gap-1">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1 ? "opacity-50 pointer-events-none" : ""
            }
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {pageNumbers.map((page, index) =>
          typeof page === "number" ? (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={page + index}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={currentPage === Math.ceil(totalPages)}
            className={
              currentPage === Math.ceil(totalPages)
                ? "opacity-50 pointer-events-none"
                : ""
            }
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < Math.ceil(totalPages))
                onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
