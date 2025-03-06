import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthTokens } from "@/shared/model/authentication";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api1.sfere.pro",
  }),
  endpoints: (builder) => ({
    getTokens: builder.query<IAuthTokens, string>({
      query: (code) => ({
        url: "/v1/auth/oauth/tokens",
        method: "GET",
        params: { code },
      }),
    }),
  }),
});

export const { useGetTokensQuery } = authApi;
