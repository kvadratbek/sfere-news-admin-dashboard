interface IPostFeed {
  base_url: string;
  logo_url: string;
  logo_url_id?: string;
  max_items: number;
  priority: number;
  translation: ITranslation[];
}
interface ITranslation {
  description: string;
  lang: string;
  title: string;
}

export type { IPostFeed };
