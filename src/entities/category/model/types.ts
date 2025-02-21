import { ICategoryResponse } from "@/shared/model/categories";

interface ICategory {
  category: ICategoryResponse;
  updateFeature: JSX.Element;
  deleteFeature: JSX.Element;
}

export type { ICategory };
