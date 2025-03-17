// features/update-feed-category/ui/CategoryForm.tsx
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { TranslationInputs } from "./translation-inputs";
import {
  handleAddTranslation,
  handleRemoveTranslation,
  handleTranslationChange,
  handleSubmit,
} from "../lib/handlers";
import {
  ICategoryResponse,
  ITranslations,
} from "@/shared/model/feed-categories";
import { IUpdateCategory } from "../model";

interface ICategoryFormProps extends IUpdateCategory {
  categoryData?: ICategoryResponse;
  isFetching: boolean;
  isUpdating: boolean;
  // eslint-disable-next-line
  updateCategory: any;
  setShowModal: (value: boolean) => void;
  iconId: string;
  setIconId: (value: string) => void;
  iconUrl: string;
  setIconUrl: (value: string) => void;
  translations: ITranslations[];
  setTranslations: (value: ITranslations[]) => void;
}

export const CategoryForm = ({
  updateCategoryId,
  // categoryData,
  isFetching,
  isUpdating,
  updateCategory,
  setShowModal,
  iconId,
  setIconId,
  iconUrl,
  setIconUrl,
  translations,
  setTranslations,
}: ICategoryFormProps) => {
  if (isFetching) return <p>Loading...</p>;

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(
          e,
          updateCategoryId,
          { iconId, iconUrl, translations },
          updateCategory,
          setShowModal
        )
      }
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="id" className="text-center">
            Category ID
          </Label>
          <Input
            id="id"
            value={updateCategoryId}
            className="col-span-3"
            disabled
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="iconId" className="text-center">
            Icon ID
          </Label>
          <Input
            id="iconId"
            value={iconId}
            placeholder={iconId ?? "No Data"}
            onChange={(e) => setIconId(e.target.value)}
            className="col-span-3"
            disabled
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="iconUrl" className="text-center">
            Icon URL
          </Label>
          <Input
            id="iconUrl"
            value={iconUrl}
            placeholder="https://example.com/icon.png"
            onChange={(e) => setIconUrl(e.target.value)}
            className="col-span-3"
          />
        </div>
      </div>

      {translations.map((translation, index) => (
        <TranslationInputs
          key={index}
          index={index}
          translation={translation}
          onChange={(i, field, value) =>
            handleTranslationChange(
              i,
              field,
              value,
              translations,
              setTranslations
            )
          }
          onRemove={(i) =>
            handleRemoveTranslation(i, translations, setTranslations)
          }
          canRemove={translations.length > 1}
        />
      ))}

      <div className="mt-4 flex gap-2">
        <Button
          className="cursor-pointer w-full"
          variant="secondary"
          type="button"
          onClick={() => handleAddTranslation(translations, setTranslations)}
          disabled={isUpdating}
        >
          + Translation
        </Button>
        <Button
          className="cursor-pointer w-full"
          variant="default"
          type="submit"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update"}
        </Button>
        <Button
          className="cursor-pointer w-full"
          variant="destructive"
          type="reset"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
