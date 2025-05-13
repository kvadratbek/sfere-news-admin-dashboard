import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";


export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
      
    tagTypes:["Category", "FeedContent", "Feed-Item", "Feed", "CategoriesKeys"],
    endpoints: ()=> ({})
})
