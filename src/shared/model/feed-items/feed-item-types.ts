interface IFeedItem {
  category_id: number;
  content: string;
  created_at: string;
  description: string;
  feed_id: number;
  id: number;
  lang: string;
  link: string;
  pulished_at: string;
  thumbnails: {
    alt_text: string;
    dld_url: string;
    height: number;
    src_url: string;
    width: number;
  };
  title: string;
  updated_at: string;
}

export type { IFeedItem };
