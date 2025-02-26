interface IAppHeader {
  isInDashboardPage: boolean;
  breadcrumbItemName?: string;
  breadcrumbFeedId?: string;
  hasLangSelector: boolean;
  actionButton?: JSX.Element;
}

export type { IAppHeader };
