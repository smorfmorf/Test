import { Button, TextField } from "@mui/material";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RootState, useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { fetchLogin, fetchRegister } from "../store/authSlice";

interface typeAuth {
   fullName: string;
   email: string;
   password: string;
}

const Auth = () => {
   const isAuth = useSelector((state: RootState) => state.auth.user);
   const location = useLocation();
   const isLogin = location.pathname === "/login";

   const dispatch = useAppDispatch();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<typeAuth>({
      defaultValues: {
         fullName: "mazaka",
         email: "mazaka@mail.ru",
         password: "123456",
      },
      mode: "onChange",
   });

   async function Submit(data: any) {
      console.log("data: ", data);
      try {
         const res = isLogin ? await dispatch(fetchLogin(data)) : await dispatch(fetchRegister(data));
         console.log(res);
         console.log("Успешно");
         localStorage.setItem("token", res.payload.token);
         //Отправка данных на сервер
      } catch (err) {
         window.alert("Ошибка при отправке данных на сервер");
      }
   }

   if (isAuth) {
      return <Navigate to={"/"} />;
   }

   return (
      <div className="h-[50vh] flex flex-col justify-center items-center">
         <div className="mx-auth w-[560px] bg-[#C4C4C4] shadow-md rounded-xl">
            <h2 className="text-2xl font-bold pt-[20px] mb-[17px] text-center">{isLogin ? "Авторизация" : "Регистрация"}</h2>

            <form onSubmit={handleSubmit(Submit)} className="p-12">
               <div className="flex flex-col gap-6 mb-6">
                  {!isLogin && <TextField {...register("fullName", { required: "Введите имя" })} label="Введите ваше имя..." fullWidth />}
                  <TextField
                     {...register("email", {
                        pattern: {
                           value: /^.+@.+\..+$/,
                           message: "Введите корректный email",
                        },
                     })}
                     label="Введите ваш email..."
                     // ? если email нету, то не нужно вытаскивать message - чтобы js ошибки не было
                     error={Boolean(errors.email?.message)}
                     fullWidth
                  />
                  <TextField {...register("password", { required: "Введите пароль" })} fullWidth label="Введите ваш пароль..." type="password" />
               </div>

               <div className="flex items-center justify-between">
                  <p className="cursor-pointer flex gap-2 items-center">
                     {isLogin ? "Нет аккаунта?" : "Есть аккаунт?"}
                     <Link to={isLogin ? "/register" : "/login"} className="text-blue-500">
                        {isLogin ? "Зарегистрироваться" : "Войти"}
                     </Link>
                  </p>
                  <Button type="submit" variant="contained" className="h-10">
                     {isLogin ? "Войти" : "Зарегистрироваться"}
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
};
export default Auth;
