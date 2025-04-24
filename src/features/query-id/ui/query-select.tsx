// query-select.tsx
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
  args: TArgs | undefined,
  options?: Record<string, unknown>
) => {
  data?: TData[];
  isLoading: boolean;
  error: unknown;
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

export const QuerySelect = <TData, TValue>({
  labelText,
  elementId,
  value,
  placeholder,
  onValueChange,
  useQueryHook,
  queryParams = {} as any, // Temporary cast, refine if needed
  getDisplayValue,
  getKeyValue,
  showAllOption = false,
  allOptionValue = "none",
  allOptionText = `All ${labelText}`,
}: QuerySelectProps<TData, TValue>) => {
  const { data, isLoading, error } = useQueryHook(queryParams);

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
        <SelectTrigger id={elementId} className="w-full text-center">
          <SelectValue placeholder={getPlaceholderText()} />
        </SelectTrigger>
        <SelectContent className="w-[var(--radix-select-trigger-width)]">
          {showAllOption && (
            <SelectItem
              value={allOptionValue}
              className="flex items-center justify-between"
            >
              <span className="pr-6 whitespace-nowrap">{allOptionText}</span>
            </SelectItem>
          )}
          {data?.map((item) => (
            <SelectItem
              key={getKeyValue(item)}
              value={getKeyValue(item).toString()}
              className="flex items-center justify-between"
            >
              <span className="pr-6 whitespace-nowrap">
                {getDisplayValue(item)}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
