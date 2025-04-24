import React from "react";
import { IFeedContent } from "@/shared/model/feed-contents";

interface IContent {
  content: IFeedContent;
  updateFeature: React.JSX.Element;
  deleteFeature: React.JSX.Element;
}

export type { IContent };
