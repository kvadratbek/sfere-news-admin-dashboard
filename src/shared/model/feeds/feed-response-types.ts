interface IGetAllFeedsResponse {
  count: number;
  feeds: IFeedResponse[]
}

interface IFeedResponse {
  base_url: string;
  created_at: string;
  id: number;
  logo_url: string;
  logo_url_id: string;
  max_items: number;
  priority: number;
  item_class:string;
  translation: IFeedTranslation[];
  updated_at: string;
}

interface IFeedTranslation {
  description: string;
  feed_id: number;
  id: number;
  lang: string;
  title: string;
}


export type { IGetAllFeedsResponse, IFeedResponse };
