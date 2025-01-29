import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/authSlice";

export const Header = () => {
   const isAuth = useSelector((state: RootState) => state.auth.user);
   console.log("isAuth: ", isAuth);
   const dispatch = useDispatch();

   function onClickLogout() {
      if (window.confirm("Выйти?")) {
         dispatch(logout());

         window.localStorage.removeItem("token");
      }
   }

   return (
      <header className="p-10 flex items-center justify-between border-b border-slate-300">
         <div className="flex items-center gap-4">
            <Link to="/">
               <img src="/vite.svg" className="w-10" />
            </Link>
            <div className="">
               <h1 className="text-3xl font-bold">React Posts</h1>
               <p className="text-sm text-gray-400">Разместите свой первый пост</p>
            </div>
         </div>

         {isAuth ? (
            <div className="flex items-center gap-4 flex-col sm:flex-row ">
               <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
               </Link>
               <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
               </Button>
            </div>
         ) : (
            <div className="flex items-center gap-4 flex-col sm:flex-row">
               <Link to="/login">
                  <Button variant="outlined">Войти</Button>
               </Link>
               <Link to="/register">
                  <Button variant="contained">Регистрация</Button>
               </Link>
            </div>
         )}
      </header>
   );
};
