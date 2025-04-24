import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

export const TextareaBlock = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <Label htmlFor={id} className="text-center">
      {label}
    </Label>
    <Textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="col-span-3"
      required
    />
  </div>
);
