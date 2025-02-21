interface IFeedResponse {
  base_url: string;
  created_at: string;
  id: number;
  logo_url: string;
  logo_url_id: string;
  max_items: number;
  priority: number;
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

export type { IFeedResponse };
