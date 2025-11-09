import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategoriesResults = createAsyncThunk(
  "categoriesResults/loadCategoriesResults",
  async (subreddit, thunkAPI) => {
    try {
      const response = await fetch(`https://www.reddit.com/r/${subreddit}/.json`);
      if (!response.ok){
        throw new Error("Failed to fetch Category Results");
      } 
      const data = await response.json()
      return data.data.children;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const CategoryResultsSlice = createSlice({
  name: "categoryResults",
  initialState: {
    category: "",
    posts: [],
    isLoadingPosts: false,
    failedToLoadPosts: false,
  },
  reducers: {
    setCategory(state, action){
      state.category = action.payload;
    }
  },
  extraReducers: (builder) => {
      builder.addCase(
        fetchCategoriesResults.pending, 
        (state) => {
          state.isLoadingPosts = true;
          state.failedToLoadPosts = false;
        }
      );
      builder.addCase(
        fetchCategoriesResults.rejected, 
        (state) => {
          state.isLoadingPosts = false;
          state.failedToLoadPosts = true;
        }
      );
      builder.addCase(
        fetchCategoriesResults.fulfilled, 
        (state, action) => {
          state.isLoadingPosts = false;
          state.failedToLoadPosts = false;
          state.posts = action.payload;
        }
      );
    }
});

export const categorySelector = (state) => state.categoryResults.category;
export const postsSelector = (state) => state.categoryResults.posts;
export const postsLoadingSelector = (state) => state.categoryResults.isLoadingPosts;
export const postsErrorSelector = (state) => state.categoryResults.failedToLoadPosts;
export const categoryResultReducer = CategoryResultsSlice.reducer;
export const { setCategory } = CategoryResultsSlice.actions;
