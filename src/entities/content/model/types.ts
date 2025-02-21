import { IFeedContent } from "@/shared/model/content";

interface IContent {
  content: IFeedContent;
  updateFeature: JSX.Element;
  deleteFeature: JSX.Element;
}

export type { IContent };
