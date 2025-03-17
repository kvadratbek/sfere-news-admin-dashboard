// features/update-feed-category/ui/TranslationInputs.tsx
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { ITranslationInputProps } from "../model/types";

export const TranslationInputs = ({
  index,
  translation,
  onChange,
  onRemove,
  canRemove,
}: ITranslationInputProps) => {
  return (
    <div className="grid gap-4 py-4 pt-4 relative">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`lang-${index}`} className="text-center">
          Language
        </Label>
        <Input
          id={`lang-${index}`}
          placeholder="en / uz / ru"
          value={translation.lang}
          onChange={(e) => onChange(index, "lang", e.target.value)}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`title-${index}`} className="text-center">
          Name
        </Label>
        <Input
          id={`title-${index}`}
          placeholder="Example Feed"
          value={translation.name}
          onChange={(e) => onChange(index, "name", e.target.value)}
          className="col-span-3"
          required
        />
      </div>
      {canRemove && (
        <Button
          className="cursor-pointer"
          type="button"
          variant="destructive"
          onClick={() => onRemove(index)}
        >
          Remove Translation Block
        </Button>
      )}
    </div>
  );
};
