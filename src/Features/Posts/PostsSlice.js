import { createAsyncThunk, createSlice }  from "@reduxjs/toolkit"

export const fetchPostList = createAsyncThunk(
  "postsList/loadPostlist",
  async (thunkAPI) => {
    try {
      const response = await fetch("https://www.reddit.com/r/popular.json"); 
      if (!response.ok){
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    isloadingPosts: false,
    failedToLoadPosts: false,
    posts: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPostList.pending, 
      (state) => {
        state.isloadingPosts = true;
        state.failedToLoadPosts = false;
      }
    );
    builder.addCase(
      fetchPostList.rejected, 
      (state) => {
        state.isloadingPosts = false;
        state.failedToLoadPosts = false;
      }
    );
    builder.addCase(
      fetchPostList.fulfilled, 
      (state, action) => {
        state.isloadingPosts = false;
        state.failedToLoadPosts = false;
        state.posts = action.payload;
      }
    );
  }
});

export const postsReducer = postsSlice.reducer
  