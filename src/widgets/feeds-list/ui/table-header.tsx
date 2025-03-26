import { TableHeader, TableHead, TableRow } from "@/shared/ui/table";

export const FeedsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Priority</TableHead>
        <TableHead>Lang</TableHead>
        <TableHead>Logo</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Description</TableHead>
      </TableRow>
    </TableHeader>
  );
};
