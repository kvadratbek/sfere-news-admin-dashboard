interface ICategoryResponse {
  icon_id: string;
  icon_url: string;
  id: 0;
  translations: ITranslations[];
}

interface ITranslations {
  lang: string;
  name: string;
}

export type { ICategoryResponse };
