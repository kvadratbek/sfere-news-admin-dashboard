import { ICategoryKeys, ICategoryKeysRequest } from "../model/feed-categories/category-response-types";
import { baseApi } from "./base_api";


export const feedCategoriesKeysApi = baseApi.injectEndpoints({
    endpoints: (builder)=> ({
        getAllCategoriesKeys:builder.query<ICategoryKeys, ICategoryKeysRequest>({
            query: ({lang, category_id}) => ({
                url:`/v1/admin/feeds/categories/key/${category_id}`,
                method:"GET",
                params:{ lang, category_id}
            }),
            providesTags:["CategoriesKeys"]
        })
    })
})

export const {useGetAllCategoriesKeysQuery} = feedCategoriesKeysApi;