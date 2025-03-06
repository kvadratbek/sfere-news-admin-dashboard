import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { IQueryLimit } from "../model";

export const QueryLimit = ({
  labelText,
  limitValue,
  limitOnChange,
}: IQueryLimit) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only digits (0-9) or empty string, no leading zeros unless it's just "0"
    if (/^(0|[1-9]\d*)$/.test(value) || value === "") {
      limitOnChange(value === "" ? undefined : Number(value));
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="query-limit" className="text-center cursor-pointer">
        {labelText}
      </Label>
      <Input
        id="query-limit"
        className="text-center inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0 border border-input shadow-xs hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 has-[>svg]:px-3 bg-transparent"
        value={limitValue ?? ""}
        onChange={handleChange}
        pattern="[0-9]*"
      />
    </div>
  );
};
