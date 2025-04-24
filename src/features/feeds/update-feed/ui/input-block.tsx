import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export const InputBlock = ({
  id,
  label,
  value,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  value: string | number;
  onChange: (val: string) => void;
  type?: string;
}) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <Label htmlFor={id} className="text-center">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="col-span-3"
      required
    />
  </div>
);
