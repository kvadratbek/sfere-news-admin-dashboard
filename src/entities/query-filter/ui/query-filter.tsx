import { IQueryFilter } from "../model";

export const QueryFilter = ({ children }: IQueryFilter) => {
  return (
    <div className="flex justify-between gap-4 items-center w-full">
      <div className="flex items-center gap-4">{children}</div>
    </div>
  );
};
