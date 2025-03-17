import { useState, useEffect } from "react";
import {
  useLazyGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "@/shared/api/feed-categories-api";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { ITranslations } from "@/shared/model/feed-categories";
import { CategoryForm } from "./form";
import { IUpdateCategory } from "../model";

export const UpdateFeedCategory = ({ updateCategoryId }: IUpdateCategory) => {
  const [trigger, { data: categoryData, isLoading: isFetching }] =
    useLazyGetCategoryByIdQuery();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [showModal, setShowModal] = useState(false);
  const [iconId, setIconId] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [translations, setTranslations] = useState<ITranslations[]>([
    { lang: "", name: "" },
  ]);

  useEffect(() => {
    if (showModal && updateCategoryId) {
      trigger(updateCategoryId);
    }
  }, [showModal, updateCategoryId, trigger]);

  useEffect(() => {
    if (categoryData) {
      setIconId(categoryData.icon_id);
      setIconUrl(categoryData.icon_url);
      setTranslations(categoryData.translations || [{ lang: "", name: "" }]);
    }
  }, [categoryData]);

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer min-w-[85px]" variant="default">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[550px] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-center">
            Update Feed Category
          </DialogTitle>
          <DialogDescription className="text-center">
            Complete the form to update an existing Feed Category
          </DialogDescription>
        </DialogHeader>
        <CategoryForm
          updateCategoryId={updateCategoryId}
          categoryData={categoryData}
          isFetching={isFetching}
          isUpdating={isUpdating}
          updateCategory={updateCategory}
          setShowModal={setShowModal}
          iconId={iconId}
          setIconId={setIconId}
          iconUrl={iconUrl}
          setIconUrl={setIconUrl}
          translations={translations}
          setTranslations={setTranslations}
        />
      </DialogContent>
    </Dialog>
  );
};
