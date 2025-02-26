interface IPostCategory {
  icon_url: string;
  translations: ITranslations[];
}

interface ITranslations {
  lang: string;
  name: string;
}

export type { IPostCategory };
