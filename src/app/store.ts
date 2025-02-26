import { configureStore } from "@reduxjs/toolkit";
import { feedCategoriesApi } from "@/shared/api/feed-categories-api";
import { feedsApi } from "@/shared/api/feeds-api";
import { feedContentsApi } from "@/shared/api/feed-contents-api";
import { feedItemsApi } from "@/shared/api/feed-items-api";
import { languageReducer } from "@/shared/hooks";

export const store = configureStore({
  reducer: {
    [feedsApi.reducerPath]: feedsApi.reducer,
    [feedCategoriesApi.reducerPath]: feedCategoriesApi.reducer,
    [feedContentsApi.reducerPath]: feedContentsApi.reducer,
    [feedItemsApi.reducerPath]: feedItemsApi.reducer,
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
      feedsApi.middleware,
      feedCategoriesApi.middleware,
      feedContentsApi.middleware,
      feedItemsApi.middleware,
    ]),
  // Explicitly configure devTools based on environment
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
