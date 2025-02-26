import { ICategoryResponse } from "@/shared/model/feed-categories";

interface ICategory {
  category: ICategoryResponse;
  updateFeature: JSX.Element;
  deleteFeature: JSX.Element;
}

export type { ICategory };
