import { IFeedItem } from "@/shared/model/feed-items";

interface IFeedItemEntity {
  feedItem: IFeedItem;
  updateFeature: JSX.Element;
  deleteFeature: JSX.Element;
}

export type { IFeedItemEntity };
