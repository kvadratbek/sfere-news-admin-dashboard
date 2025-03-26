import { FeedsTableHeader } from "./table-header";
import { Skeleton } from "@/shared/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/shared/ui/table";

export const FeedsListLoading = () => (
  <div className="flex flex-1 flex-col gap-4 p-4">
    <div className="rounded-xl bg-muted/50 p-4">
      <Table>
        <FeedsTableHeader />
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
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
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);
