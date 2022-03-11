import { configureStore } from "@reduxjs/toolkit";
import typingSlice from "./typingSlice";

export const store = configureStore({
  reducer: {
    typing: typingSlice,
  },
});
