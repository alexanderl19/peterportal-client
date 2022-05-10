import { createClient } from "@liveblocks/client";
import { enhancer } from "@liveblocks/redux";

import { configureStore } from "@reduxjs/toolkit";
import roadmapReducer from "./slices/roadmapSlice";

// @ts-ignore
const client = createClient({
  publicApiKey: process.env.REACT_APP_LIVEBLOCK_PUBLIC_KEY,
});

export const store = configureStore({
  reducer: {
    roadmap: roadmapReducer,
  },
  enhancers: [
    enhancer({
      client,
      storageMapping: { roadmap: true },
    }),
  ],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;
