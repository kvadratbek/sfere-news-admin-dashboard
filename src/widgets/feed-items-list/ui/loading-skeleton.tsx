import { Skeleton } from "@/shared/ui/skeleton";
import { TableCell, TableRow } from "@/shared/ui/table";

export const LoadingSkeleton = () => {
  return (
    <TableRow>
      <TableCell colSpan={2}>
        <Skeleton className="h-[20.8px] w-full m-[5px]" />
      </TableCell>
      <TableCell colSpan={5}>
        <Skeleton className="h-[20.8px] w-full m-[5px]" />
      </TableCell>
      <TableCell colSpan={2}>
        <Skeleton className="h-[20.8px] w-full m-[5px]" />
      </TableCell>
    </TableRow>
  );
};
