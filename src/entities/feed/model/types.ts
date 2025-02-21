import { IFeedResponse } from "@/shared/model/feeds";

interface IFeedProps {
  feed: IFeedResponse;
  viewContentsFeature: JSX.Element;
  updateFeature: JSX.Element;
  deleteFeature: JSX.Element;
}

export type { IFeedProps };
