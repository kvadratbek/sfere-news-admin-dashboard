import { IFeedItem } from "./feed-item-types";

interface IAllFeedItemsResponse {
  count: number;
  items: IFeedItem[];
  total_items: number;
}

export type { IAllFeedItemsResponse };
