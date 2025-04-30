import { skipToken } from "@reduxjs/toolkit/query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";
import { IQuerySelect } from "../model";

type QueryHookType<TData, TArgs = Record<string, unknown>> = (
  args: TArgs | typeof skipToken,
  options?: Record<string, unknown>
) => {
  data?: TData[];
  isLoading: boolean;
  error?: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

interface QuerySelectProps<TData, TValue, TArgs = Record<string, unknown>>
  extends Omit<IQuerySelect, "onIdChange"> {
  useQueryHook: QueryHookType<TData, TArgs>;
  queryParams?: TArgs;
  getDisplayValue: (item: TData) => string;
  getKeyValue: (item: TData) => string | number;
  onValueChange: (value: TValue) => void;
  value: TValue;
  showAllOption?: boolean;
  allOptionValue?: string;
  allOptionText?: string;
}

export const QuerySelect = <TData, TValue, TArgs>({
  labelText,
  elementId,
  value,
  placeholder,
  onValueChange,
  useQueryHook,
  queryParams,
  getDisplayValue,
  getKeyValue,
  showAllOption = false,
  allOptionValue = "none",
  allOptionText = `All ${labelText}`,
}: QuerySelectProps<TData, TValue, TArgs>) => {
  const { data, isLoading, error } = useQueryHook(
    queryParams ?? skipToken // Handle undefined queryParams
  );

  const handleValueChange = (selectedValue: string) => {
    if (showAllOption && selectedValue === allOptionValue) {
      onValueChange(undefined as TValue);
    } else {
      onValueChange(selectedValue as TValue);
    }
  };

  const getPlaceholderText = () => {
    if (isLoading) return `Loading ${labelText.toLowerCase()}...`;
    if (error) return `Error loading ${labelText.toLowerCase()}`;
    return placeholder;
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={elementId} className="text-center cursor-pointer">
        {labelText}
      </Label>
      <Select
        value={isLoading || error ? undefined : String(value ?? allOptionValue)}
        onValueChange={handleValueChange}
        disabled={isLoading}
      >
        <SelectTrigger
          id={elementId}
          className="w-full inline-flex items-center justify-center text-center h-9 px-4 py-2 border"
        >
          <SelectValue
            className="flex justify-center text-center"
            placeholder={getPlaceholderText()}
          />
        </SelectTrigger>
        <SelectContent>
          {showAllOption && (
            <SelectItem
              value={allOptionValue}
              className="flex items-center justify-between"
            >
              <span className="pr-6 whitespace-nowrap text-center">
                {allOptionText}
              </span>
            </SelectItem>
          )}
          {data?.map((item) => (
            <SelectItem
              key={getKeyValue(item)}
              value={getKeyValue(item).toString()}
              className="flex items-center justify-between"
            >
              <span className="pr-6 whitespace-nowrap text-center">
                {getDisplayValue(item)}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
