import { IFeedContent } from "./content-types";

interface IFeedContentsResponse {
  feedContents: {
    contents: IFeedContent[];
  };
}

export type { IFeedContentsResponse };
