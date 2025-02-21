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

export const LangSelector = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );

  const availableLanguages = ["uz", "ru", "en"];

  return (
    <Select onValueChange={(e) => dispatch(setLanguage(e))}>
      <SelectTrigger className="w-min">
        <SelectValue placeholder={selectedLanguage} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {availableLanguages.map((lang) => (
            <SelectItem className="cursor-pointer" value={lang} key={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
