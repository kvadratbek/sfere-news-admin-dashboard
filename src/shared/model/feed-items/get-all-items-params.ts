interface IGetAllFeedItemsParams {
  limit?: number;
  page?: number;
  feed_id?: number;
  feed_category_id?: number;
  feed_item_id?: number;
  lang?: string;
  sort?: "published_at" | string;
}

export type { IGetAllFeedItemsParams };
