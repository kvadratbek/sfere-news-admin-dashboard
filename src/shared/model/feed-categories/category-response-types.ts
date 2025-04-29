interface IGetAllCategories {
  count: number;
  categories: ICategoryResponse[];
}
interface ICategoryResponse {
  icon_id: string;
  icon_url: string;
  id: number;
  translations: ITranslations[];
}

interface ITranslations {
  lang: string;
  name: string;
}

export type { ICategoryResponse, ITranslations, IGetAllCategories };
