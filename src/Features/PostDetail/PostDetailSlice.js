import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPostDetail = createAsyncThunk(
  "postDetail/loadPostDetail",
  async ({subreddit, id}, thunkAPI) => {
    try {
      const response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${id}.json`);
      if (!response.ok){
        throw new Error("Failed to fetch Post Detail");
      }
      const data = await response.json();
      return {
        post: data[0].data.children[0].data,
        comments: data[1].data.children, 
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)


export const postDetailSlice = createSlice ({
  name: "postDetail",
  initialState: {
    postdetails: {},
    comments: [],
    title: "",
    thumbnail: "",
    isloadingPost: false,
    failedToLoadPost: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPostDetail.pending,
      (state) => {
        state.isloadingPost = true;
        state.failedToLoadPost = false;
      }
    );
    builder.addCase(
      fetchPostDetail.rejected,
      (state) => {
        state.isloadingPost = false;
        state.failedToLoadPost = true;
      }
    );
    builder.addCase(
      fetchPostDetail.fulfilled,
      (state, action)=>{
        state.isloadingPost = false;
        state.failedToLoadPost = false;
        state.postdetails = action.payload.post;
        state.comments = action.payload.comments;
        state.title = action.payload.post.title;
        state.thumbnail = action.payload.post.thumbnail;
      }
    )
  }
});

export const titleSelector = (state) => state.postDetail.title;
export const thumbnailSelector = (state) => state.postDetail.thumbnail;
export const commentsSelector = (state) => state.postDetail.comments;
export const postDetailReducer = postDetailSlice.reducer;
export const detailLoadingSelector = (state) => state.postDetail.isloadingPost;
export const detailFailedSelector = (state) => state.postDetail.failedToLoadPost;