import { TableCell, TableFooter, TableRow } from "@/shared/ui/table";

export const ItemsFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={9}>{children}</TableCell>
      </TableRow>
    </TableFooter>
  );
};
