import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";

export const QueryPriority = ({
  onPriorityChange,
  priorityStatus,
}: {
  onPriorityChange: React.MouseEventHandler<HTMLButtonElement>;
  priorityStatus: string;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="query-priority" className="text-center cursor-pointer">
        Priority:
      </Label>
      <Button
        variant="outline"
        className="cursor-pointer bg-transparent"
        id="query-priority"
        onClick={onPriorityChange}
      >
        {priorityStatus}
      </Button>
    </div>
  );
};
