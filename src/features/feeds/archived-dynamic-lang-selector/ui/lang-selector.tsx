import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useGetAllFeedsQuery } from "@/shared/api/feeds-api";
import { setAvailableLanguages, setLanguage } from "@/shared/hooks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export const DynamicLangSelector = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );
  const availableLanguages = useSelector(
    (state: RootState) => state.language.availableLanguages
  );

  const { data } = useGetAllFeedsQuery({
    limit: 999999,
    page: 1,
    priority: false,
    lang: selectedLanguage,
  });

  useEffect(() => {
    if (data) {
      const languages = new Set<string>();

      data.forEach((feed) => {
        feed.translation.forEach((t) => {
          languages.add(t.lang);
        });
      });

      dispatch(setAvailableLanguages(Array.from(languages)));
    }
  }, [data, dispatch]);

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
