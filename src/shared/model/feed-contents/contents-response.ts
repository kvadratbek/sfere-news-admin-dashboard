import { IFeedContent } from "./content-types";

interface IFeedContentsResponse {
  feedContents: {
    contents: IFeedContent[] | null;
  };
}

export type { IFeedContentsResponse };
