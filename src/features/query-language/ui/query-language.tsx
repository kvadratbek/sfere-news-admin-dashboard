import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setLanguage } from "@/shared/hooks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";
import { cn } from "@/shared/lib";

const languageOptions: { code: string; name: string }[] = [
  { code: "uz", name: "Uzbek" },
  { code: "ru", name: "Russian" },
  { code: "en", name: "English" },
];

export const QueryLanguage = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );

  const handleLanguageChange = (value: string) => {
    dispatch(setLanguage(value));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="language-selector" className="text-center cursor-pointer">
        Language
      </Label>
      <Select onValueChange={handleLanguageChange} value={selectedLanguage}>
        <SelectTrigger
          className={cn(
            "text-center inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0 border border-input shadow-xs hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 has-[>svg]:px-3 cursor-pointer bg-transparent"
          )}
          id="language-selector"
        >
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {languageOptions.map((lang) => (
              <SelectItem
                key={lang.code}
                value={lang.code}
                className="cursor-pointer flex justify-between"
              >
                {lang.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
