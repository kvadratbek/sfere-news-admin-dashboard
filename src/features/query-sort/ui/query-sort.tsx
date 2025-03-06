import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";
import { OPTIONS, IQuerySort } from "../model";

export const QuerySort = ({
  labelText,
  selectedOption,
  onOptionChange,
}: IQuerySort) => {
  const handleOptionChange = (newValue: string) => {
    onOptionChange(newValue === "" ? undefined : newValue);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="query-sort" className="text-center cursor-pointer">
        {labelText}
      </Label>
      <Select
        onValueChange={handleOptionChange}
        value={selectedOption ?? ""} // Fallback to "" for controlled input
      >
        <SelectTrigger
          id="query-sort"
          className="text-center h-9 px-4 py-2 border border-input rounded-md shadow-xs hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          <SelectValue
            className="text-center w-full"
            placeholder="Select Option"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="cursor-pointer"
              >
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
