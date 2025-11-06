import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./Features/PostList/PostListSlice";

const store = configureStore({
  reducer: {
    postList: postsReducer,
  }
});

export default store;