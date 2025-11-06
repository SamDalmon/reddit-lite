import { createAsyncThunk, createSlice }  from "@reduxjs/toolkit"

export const fetchPostList = createAsyncThunk(
  "postsList/loadPostlist",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("https://www.reddit.com/r/popular.json"); 
      if (!response.ok){
        throw new Error("Failed to fetch Post List");
      }
      const data = await response.json();
      return data.data.children;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postsSlice = createSlice({
  name: "postList",
  initialState: {
    isLoadingPosts: false,
    failedToLoadPosts: false,
    posts: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPostList.pending, 
      (state) => {
        state.isLoadingPosts = true;
        state.failedToLoadPosts = false;
      }
    );
    builder.addCase(
      fetchPostList.rejected, 
      (state) => {
        state.isLoadingPosts = false;
        state.failedToLoadPosts = true;
      }
    );
    builder.addCase(
      fetchPostList.fulfilled, 
      (state, action) => {
        state.isLoadingPosts = false;
        state.failedToLoadPosts = false;
        state.posts = action.payload;
      }
    );
  }
});

export const postsSelector = (state) => state.postList.posts;
export const postsLoadingSelector = (state) => state.postList.isLoadingPosts;
export const postsErrorSelector = (state) => state.postList.failedToLoadPosts;
export const postsReducer = postsSlice.reducer;

  