import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearchResults = createAsyncThunk(
  "postsList/loadPostlist",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}`); 
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

export const searchResultsSlice = createSlice({
  name: fetchSearchResults,
  initialState: {
    searchTerm: "",
    posts:[],
    isLoadingPosts: false,
    failedToLoadPosts: false, 
  },
  reducers: {
    setSearchTerm(state, action){
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
      builder.addCase(
        fetchSearchResults.pending, 
        (state) => {
          state.isLoadingPosts = true;
          state.failedToLoadPosts = false;
        }
      );
      builder.addCase(
        fetchSearchResults.rejected, 
        (state) => {
          state.isLoadingPosts = false;
          state.failedToLoadPosts = true;
        }
      );
      builder.addCase(
        fetchSearchResults.fulfilled, 
        (state, action) => {
          state.isLoadingPosts = false;
          state.failedToLoadPosts = false;
          state.posts = action.payload;
        }
      );
    }
})

export const searchReducer = searchResultsSlice.reducer;
export const postsLoadingSelector = (state) => state.searchResult.isLoadingPosts;
export const postsErrorSelector = (state) => state.searchResult.failedToLoadPosts;
export const postsSelector = (state) => state.searchResult.posts
export const searchTermSelector = (state) => state.searchResult.searchTerm
export const { setSearchTerm } = searchResultsSlice.actions