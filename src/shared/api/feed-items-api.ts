import {
  IFeedItem,
  IMutateFeedItem,
  IGetAllFeedItemsParams,
  IAllFeedItemsResponse,
  IGetItemsByFeedParams,
} from "../model/feed-items";
import { baseApi } from "./base_api";

export const feedItemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFeedItem: builder.mutation<IFeedItem, IMutateFeedItem>({
      query: (item) => ({
        url: "/v1/admin/feeds/items/",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Feed-Item"],
    }),
    getAllFeedItems: builder.query<
      IAllFeedItemsResponse,
      IGetAllFeedItemsParams
    >({
      query: ({
        limit,
        page,
        feed_id,
        feed_category_id,
        feed_item_id,
        lang,
        sort,
      }) => ({
        url: "/v1/admin/feeds/items/all",
        params: {
          limit,
          page,
          feed_id,
          feed_category_id,
          feed_item_id,
          lang,
          sort,
        },
      }),
      providesTags: ["Feed-Item"],
    }),
    getAllItemsByFeed: builder.query<IFeedItem, IGetItemsByFeedParams>({
      query: ({ limit, page, lang, feed_id }) => ({
        url: `/v1/admin/feeds/items/all/${feed_id}`,
        params: { limit, page, lang, feed_id },
      }),
      providesTags: ["Feed-Item"],
    }),
    getFeedItemById: builder.query<IFeedItem, number>({
      query: (id) => `/v1/admin/feeds/items/${id}`,
      providesTags: ["Feed-Item"],
    }),
    updateFeedItem: builder.mutation<
      IFeedItem,
      { id: number; item: IMutateFeedItem }
    >({
      query: ({ id, item }) => ({
        url: `/v1/admin/feeds/items/${id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["Feed-Item"],
    }),
    deleteFeedItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/admin/feeds/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feed-Item"],
    }),
  }),
});

export const {
  useCreateFeedItemMutation,
  useGetAllFeedItemsQuery,
  useGetAllItemsByFeedQuery,
  useLazyGetFeedItemByIdQuery,
  useUpdateFeedItemMutation,
  useDeleteFeedItemMutation,
} = feedItemsApi;
