import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./Features/Posts/PostsSlice";

const store = configureStore({
  reducer: {
    postsList: postsReducer,
  }
});

export default store;