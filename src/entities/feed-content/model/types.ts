import { IFeedContent } from "@/shared/model/feed-contents";

interface IContent {
  content: IFeedContent;
  updateFeature: JSX.Element;
  deleteFeature: JSX.Element;
}

export type { IContent };
