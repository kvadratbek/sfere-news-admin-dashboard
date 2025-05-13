import { configureStore } from "@reduxjs/toolkit";
import {
  authApi,
  feedCategoriesApi,
  feedsApi,
  feedContentsApi,
  feedItemsApi,
} from "@/shared/api";
import authRedcuer from "@/features/authentication";
import { languageReducer } from "@/shared/hooks";
import { feedCategoriesKeysApi } from "@/shared/api/feed-categories-keys-api";

export const store = configureStore({
  reducer: {
    auth: authRedcuer,
    [authApi.reducerPath]: authApi.reducer,
    [feedsApi.reducerPath]: feedsApi.reducer,
    [feedCategoriesApi.reducerPath]: feedCategoriesApi.reducer,
    [feedContentsApi.reducerPath]: feedContentsApi.reducer,
    [feedItemsApi.reducerPath]: feedItemsApi.reducer,
    [feedCategoriesKeysApi.reducerPath]: feedCategoriesKeysApi.reducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Optional: Configure if you need to handle non-serializable values
      serializableCheck: {
        // Ignore specific actions or paths if needed
        ignoredActions: [],
        ignoredPaths: [],
      },
    }).concat([
      authApi.middleware,
      feedsApi.middleware,
      feedCategoriesApi.middleware,
      feedContentsApi.middleware,
      feedItemsApi.middleware,
      feedCategoriesKeysApi.middleware,
    ]),
  // Explicitly configure devTools based on environment
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
