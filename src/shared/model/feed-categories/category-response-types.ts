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
interface ICategoryKey {
  id:number;
  category_id:number;
  lang: string;
  name: string;
}
interface ICategoryKeys {
  keys: ICategoryKey[];
}
interface ICategoryKeysRequest{
  lang:string;
  category_id: number;
}

export type { ICategoryResponse, ITranslations, IGetAllCategories, ICategoryKeys, ICategoryKeysRequest, ICategoryKey };
