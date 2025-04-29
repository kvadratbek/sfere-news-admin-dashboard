import { IAuthTokens } from "@/shared/model/authentication";
import { IAuthRefreshTokenResponse } from "../model/authentication/auth-tokens";
import { baseApi } from "./base_api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTokens: builder.query<IAuthTokens, string>({
      query: (code) => ({
        url: "/v1/auth/oauth/tokens",
        method: "GET",
        params: { code },
      }),
    }),
    refreshToken:builder.query<IAuthRefreshTokenResponse, string>({
       query: (session_id) => ({
        url:"/v1/auth/oauth/refresh",
        method: "GET",
        params: {session_id}
       })
    })
  }),
});

export const { useGetTokensQuery, useRefreshTokenQuery } = authApi;
