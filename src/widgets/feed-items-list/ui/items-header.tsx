import { TableHead, TableHeader, TableRow } from "@/shared/ui/table";

export const ItemsHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Feed ID</TableHead>
        <TableHead>Category ID</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Lang</TableHead>
        <TableHead>Thumbnail</TableHead>
      </TableRow>
    </TableHeader>
  );
};
