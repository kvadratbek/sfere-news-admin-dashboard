export interface AppPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
