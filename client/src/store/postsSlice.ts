import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export interface Author {
   id: number;
   fullName: string;
   email: string;
   createdAt: string;
   updatedAt: string;
}

export interface PostsItem {
   id: number;
   title: string;
   text: string;
   imageUrl: string;
   author: Author;
   createdAt: string;
   updatedAt: string;
}

export interface PostsSlice {
   posts: PostsItem[];
   status: Status;
}
export enum Status {
   LOADING = "loading",
   SUCCESS = "success",
   ERROR = "error",
}

const initialState: PostsSlice = {
   posts: [],
   status: Status.LOADING,
};

export const fetchPosts = createAsyncThunk<PostsItem[]>("fetchPosts", async () => {
   const { data } = await axios.get<PostsItem[]>("/api/posts");

   return data;
});
export const deletePosts = createAsyncThunk<PostsItem[], number>("deletePosts", async (id) => {
   const { data } = await axios.delete(`/api/posts/${id}`);

   return data;
});

export const postsSlice = createSlice({
   name: "posts",
   initialState,
   reducers: {},
   extraReducers:
      // в нем описываем состояние асинхроного экшена(запроса) => 3 Cценария:
      (builder) => {
         // получение статьей
         builder.addCase(fetchPosts.pending, (state) => {
            state.posts = [];
            state.status = Status.LOADING;
         });
         builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.status = Status.SUCCESS;
         });
         builder.addCase(fetchPosts.rejected, (state) => {
            state.posts = [];
            state.status = Status.ERROR;
         });

         builder.addCase(deletePosts.pending, (state, action) => {
            console.log(action);
            state.posts = state.posts.filter((post) => post.id !== action.meta.arg);
         });
      },
});

export default postsSlice.reducer;
