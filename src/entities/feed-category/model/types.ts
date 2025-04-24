import React from "react";
import { ICategoryResponse } from "@/shared/model/feed-categories";

interface ICategory {
  category: ICategoryResponse;
  updateFeature: React.JSX.Element;
  deleteFeature: React.JSX.Element;
}

export type { ICategory };
