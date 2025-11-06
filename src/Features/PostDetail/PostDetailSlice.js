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
      return data.data.children;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)


export const postDetailSlice = createSlice ({
  name: "postDetail",
  initialState: {
    postdetails: {},
    isloadingPost: false,
    failedToLoadPost: false,
    postComments: {},
    isloadingComments: false,
    failedToLoadComments: false
  },
  reducers: {},
  extraReducers: (builder) => {
    
  }
})