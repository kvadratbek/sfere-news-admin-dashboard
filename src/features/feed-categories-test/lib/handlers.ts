// features/update-feed-category/lib/handlers.ts
import { toast } from "sonner";
import {
  ICategoryResponse,
  ITranslations,
} from "@/shared/model/feed-categories";

export const handleSubmit = async (
  e: React.FormEvent,
  updateCategoryId: number,
  formState: {
    iconId: string;
    iconUrl: string;
    translations: ITranslations[];
  },
  // eslint-disable-next-line
  updateCategory: any,
  setShowModal: (value: boolean) => void
) => {
  e.preventDefault();

  const category: ICategoryResponse = {
    id: updateCategoryId,
    icon_id: formState.iconId,
    icon_url: formState.iconUrl,
    translations: formState.translations,
  };

  try {
    await updateCategory({ id: updateCategoryId, category }).unwrap();
    toast.success("Category updated successfully!", {
      description: `Feed (ID: ${updateCategoryId}) has been updated`,
    });
    setShowModal(false);
  } catch (error: unknown) {
    toast.error("Failed to update category", {
      description: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const handleAddTranslation = (
  translations: ITranslations[],
  setTranslations: (translations: ITranslations[]) => void
) => {
  setTranslations([...translations, { lang: "", name: "" }]);
};

export const handleRemoveTranslation = (
  index: number,
  translations: ITranslations[],
  setTranslations: (translations: ITranslations[]) => void
) => {
  if (translations.length > 1) {
    setTranslations(translations.filter((_, i) => i !== index));
  }
};

export const handleTranslationChange = (
  index: number,
  field: string,
  value: string,
  translations: ITranslations[],
  setTranslations: (translations: ITranslations[]) => void
) => {
  const updatedTranslations = [...translations];
  updatedTranslations[index] = {
    ...updatedTranslations[index],
    [field]: value,
  };
  setTranslations(updatedTranslations);
};
