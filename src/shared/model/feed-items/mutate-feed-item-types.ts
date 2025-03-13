interface IMutateFeedItem {
  category_id: number;
  content: string;
  // created_at: string;
  description: string;
  feed_id: number;
  // id: number;
  lang: string;
  link: string;
  pulished_at: string;
  soruce_url: string;
  source_title: string;
  thumbnails: {
    alt_text: string;
    dld_url: string;
    // height: number;
    // src_url: string;
    // width: number;
  };
  title: string;
  // updated_at: string;
}

export type { IMutateFeedItem };
