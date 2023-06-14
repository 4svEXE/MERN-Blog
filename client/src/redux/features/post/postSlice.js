import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  posts: [],
  popularPosts: [],
  isLoading: false,
  status: null,
};

export const createPost = createAsyncThunk(
  "post/createPost",
  async (params) => {
    try {
      const { data } = await axios.post("/posts", params);
      console.log('createAsyncThunk', data, params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    // Create a new post
    [createPost.pending]: (state) => {
      state.isLoading = true;
    },

    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload);
    },

    [createPost.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
  },
});

export default postsSlice.reducer;
