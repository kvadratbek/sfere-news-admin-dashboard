import { ITranslations } from "@/shared/model/feed-categories/category-response-types";

interface IUpdateCategory {
  updateCategoryId: number;
}

interface IFormState {
  iconId: string;
  iconUrl: string;
  translations: ITranslations[];
}

interface ITranslationInputProps {
  index: number;
  translation: ITranslations;
  onChange: (index: number, field: string, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

export type { IUpdateCategory, IFormState, ITranslationInputProps };
