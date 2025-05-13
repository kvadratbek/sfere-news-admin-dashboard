import { ICategoryKey } from "@/shared/model/feed-categories/category-response-types";


interface IFeedCatgoryKeysContent {
  content: ICategoryKey;
  updateFeature: React.JSX.Element;
  deleteFeature: React.JSX.Element;
}

export type { IFeedCatgoryKeysContent };