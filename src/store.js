import { configureStore } from "@reduxjs/toolkit";
import { postListReducer } from "./Features/PostList/PostListSlice";
import { postDetailReducer } from "./Features/PostDetail/PostDetailSlice";
import { searchReducer } from "./Features/SearchResults/SearchResultsSlice";

const store = configureStore({
  reducer: {
    postList: postListReducer,
    postDetail: postDetailReducer,
    searchResult: searchReducer,
  }
});

export default store;