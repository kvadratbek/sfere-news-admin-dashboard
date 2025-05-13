import { Skeleton } from "@/shared/ui/skeleton";
import { TableCell, TableRow } from "@/shared/ui/table";

export const LoadingSkeleton = () => (
  <TableRow>
    <TableCell colSpan={2}>
      <Skeleton className="h-[20.8px] w-full m-[5px]" />
    </TableCell>
    <TableCell colSpan={3}>
      <Skeleton className="h-[20.8px] w-full m-[5px]" />
    </TableCell>
    <TableCell colSpan={1}>
      <Skeleton className="h-[20.8px] w-full m-[5px]" />
    </TableCell>
  </TableRow>
);
