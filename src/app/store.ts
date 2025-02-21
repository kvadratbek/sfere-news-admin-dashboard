import { configureStore } from "@reduxjs/toolkit";
import { feedsApi } from "@/shared/api/feeds-api";
import { feedCategoriesApi } from "@/shared/api/feed-categories-api";
import { feedContentApi } from "@/shared/api/feed-content-api";
import { languageReducer } from "@/shared/hooks";

export const store = configureStore({
  reducer: {
    [feedsApi.reducerPath]: feedsApi.reducer,
    [feedCategoriesApi.reducerPath]: feedCategoriesApi.reducer,
    [feedContentApi.reducerPath]: feedContentApi.reducer,
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
      feedContentApi.middleware,
    ]),
  // Explicitly configure devTools based on environment
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Actual inferred type will be:
// {
//   [feedsApi.reducerPath]: ReturnType<typeof feedsApi.reducer>,
//   [feedCategoriesApi.reducerPath]: ReturnType<typeof feedCategoriesApi.reducer>,
//   [feedContentApi.reducerPath]: ReturnType<typeof feedContentApi.reducer>,
//   language: ReturnType<typeof languageReducer>
// }
export type AppDispatch = typeof store.dispatch;
