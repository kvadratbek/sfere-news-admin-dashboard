import { useNavigate } from "react-router-dom";
import { Rss } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { IViewContacts } from "../model";

export const ViewContents = ({ feedId }: IViewContacts) => {
  const feedIdStringified = feedId.toString();
  const navigateTo = useNavigate();
  const handleViewContents = () => {
    navigateTo(`/feeds/${feedIdStringified}`);
  };

  return (
    <Button
      className="cursor-pointer"
      variant="secondary"
      onClick={handleViewContents}
    >
      <Rss />
    </Button>
  );
};
