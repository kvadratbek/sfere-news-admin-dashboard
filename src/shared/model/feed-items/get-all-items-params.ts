interface IGetAllFeedItemsParams {
  limit?: number | undefined;
  page?: number;
  feed_id?: number | undefined;
  feed_category_id?: number | undefined;
  feed_item_id?: number | undefined;
  lang?: string | null;
  sort?:
    | "feed_id"
    | "feed_category_id"
    | "feed_item_id"
    | "lang"
    | "published_at"
    | "title"
    | string;
}

export type { IGetAllFeedItemsParams };
