import { configureStore } from "@reduxjs/toolkit";
import { postListReducer } from "./Features/PostList/PostListSlice";
import { postDetailReducer } from "./Features/PostDetail/PostDetailSlice";

const store = configureStore({
  reducer: {
    postList: postListReducer,
    postDetail: postDetailReducer,
  }
});

export default store;