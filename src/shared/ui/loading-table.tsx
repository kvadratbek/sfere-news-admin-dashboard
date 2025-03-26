import { TableBody, TableCell, TableRow } from "./table";
import { Skeleton } from "./skeleton";

interface ILoadingTable {
  tableLength?: number;
  colSpan?: number;
}

export const LoadingTable = ({
  tableLength = 10,
  colSpan = 10,
}: ILoadingTable) => {
  return (
    <TableBody>
      {Array.from({ length: tableLength }).map((_, index) => (
        <TableRow key={index}>
          <TableCell colSpan={colSpan}>
            <Skeleton className="h-[21px] w-[full] m-[5px]" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
