import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export interface Auth {
   id: number;
   fullName: string;
   email: string;
   createdAt: string;
   updatedAt: string;
   token: string;
}

export interface AuthSlice {
   user: Auth | null;
   status: Status;
}
export enum Status {
   LOADING = "loading",
   SUCCESS = "success",
   ERROR = "error",
}

const initialState: AuthSlice = {
   user: null,
   status: Status.LOADING,
};

export const fetchRegister = createAsyncThunk("register", async (params: any) => {
   const { data } = await axios.post("/api/register", params); // передаем данные в body

   return data;
});

export const fetchLogin = createAsyncThunk("login", async (params: any) => {
   const { data } = await axios.post("/api/login", params);

   return data;
});

export const fetchAuth = createAsyncThunk("auth", async () => {
   const { data } = await axios.get("/api/auth");

   return data;
});

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      logout: (state) => {
         state.user = null;
      },
   },
   extraReducers:
      // в нем описываем состояние асинхроного экшена(запроса) => 3 Cценария:
      (builder) => {
         //* register
         builder.addCase(fetchRegister.pending, (state) => {
            state.user = null;
            state.status = Status.LOADING;
         });
         builder.addCase(fetchRegister.fulfilled, (state, action) => {
            console.log("action: ", action.payload);
            state.user = action.payload;
            state.status = Status.SUCCESS;
         });
         builder.addCase(fetchRegister.rejected, (state, action) => {
            console.log("action: ", action.payload);
            state.user = null;
            state.status = Status.ERROR;
         });

         //* login
         builder.addCase(fetchLogin.pending, (state) => {
            state.user = null;
            state.status = Status.LOADING;
         });
         builder.addCase(fetchLogin.fulfilled, (state, action) => {
            console.log("action: ", action.payload);
            state.user = action.payload;
            state.status = Status.SUCCESS;
         });
         builder.addCase(fetchLogin.rejected, (state, action) => {
            console.log("action: ", action.payload);
            state.user = null;
            state.status = Status.ERROR;
         });
         //* auth
         builder.addCase(fetchAuth.pending, (state) => {
            state.user = null;
            state.status = Status.LOADING;
         });
         builder.addCase(fetchAuth.fulfilled, (state, action) => {
            console.log("action: ", action.payload);
            state.user = action.payload;
            state.status = Status.SUCCESS;
         });
         builder.addCase(fetchAuth.rejected, (state, action) => {
            console.log("action: ", action.payload);
            state.user = null;
            state.status = Status.ERROR;
         });
      },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
