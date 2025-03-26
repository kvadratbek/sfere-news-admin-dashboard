import { TableHead, TableHeader, TableRow } from "@/shared/ui/table";

export const FeedCategoriesListHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Lang</TableHead>
        <TableHead>Icon</TableHead>
        <TableHead>Name</TableHead>
      </TableRow>
    </TableHeader>
  );
};
