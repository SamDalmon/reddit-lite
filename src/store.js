import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./Features/PostList/PostListSlice";

const store = configureStore({
  reducer: {
    postsList: postsReducer,
  }
});

export default store;