import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { RootState } from "@/app/store";
import { authTokenChange } from "@/features/authentication/auth-slice/model/auth-slice";


interface RefreshResponse {
  access_token: string;
  sesion: {
    access_token: string;
    created_at: string;
    expires_at: string;
    id: string;
  };
}


const baseQuery = fetchBaseQuery({
  baseUrl: "https://api1.sfere.pro",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.usedToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});


export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  
  let result = await baseQuery(args, api, extraOptions);
  const authState = (api.getState() as RootState).auth;

  
  if (result.error && result.error.status === 401) {
    if (!authState.session_id) return result;

    const refreshBaseQuery = fetchBaseQuery({
      baseUrl: "https://api1.sfere.pro",
    });

    const refreshResult = await refreshBaseQuery(
      {
        url: "/v1/auth/oauth/refresh",
        method: "GET",
        params: {
          session_id: authState.session_id,
        },
      },
      api,
      extraOptions
    );

    const refreshData = refreshResult.data as RefreshResponse | undefined;
    const newSession = refreshData?.sesion;

    if (newSession?.access_token && newSession?.id) {
      api.dispatch(
        authTokenChange({
          accessToken: newSession.access_token,
          session_id: newSession.id,
        })
      );

      
      result = await baseQuery(args, api, extraOptions);
    }
    // else {
    //   console.error("Something went with refresh token", refreshResult.error);
    //   api.dispatch(logoutUser());
    // }
  }

  return result;
};
