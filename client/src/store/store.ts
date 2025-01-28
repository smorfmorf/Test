import { useDispatch } from "./../../node_modules/react-redux/src/hooks/useDispatch";
import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./postsSlice";
import auth from "./authSlice";

export const store = configureStore({
   reducer: { postsSlice, auth },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// для асинхроных экшенов
export const useAppDispatch = () => useDispatch<AppDispatch>();
