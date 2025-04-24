import React from "react";
import { IFeedItem } from "@/shared/model/feed-items";

interface IFeedItemEntity {
  feedItem: IFeedItem;
  updateFeature: React.JSX.Element;
  deleteFeature: React.JSX.Element;
}

export type { IFeedItemEntity };
