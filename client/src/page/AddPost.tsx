import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "../axios";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

const AddPost = () => {
   const { id } = useParams();
   const isEditing = Boolean(id);
   React.useEffect(() => {
      if (id) {
         axios.get(`/api/posts/${id}`).then(({ data }) => {
            setTitle(data.title);
            setText(data.text);
            setImageUrl(data.imageUrl);
         });
      }
   }, []);

   const isAuth = useSelector((state: RootState) => state.auth.user);
   const navigate = useNavigate();
   const inputFileRef = React.useRef<HTMLInputElement>(null);

   const [imageUrl, setImageUrl] = React.useState<string>("");
   const [text, setText] = React.useState("");
   const [title, setTitle] = React.useState("");

   // передаем post на сервак
   async function onSumbit() {
      const fields = {
         title,
         text,
         imageUrl,
      };

      //если редактирование ответ с записью не вернется, если не редактирование то вернется ответ с записью и там вытаскиваем _id
      const { data } = isEditing ? await axios.patch(`/api/posts/${id}`, fields) : await axios.post("/api/posts", fields);
      const _id = isEditing ? id : data.id;
      navigate(`/posts/${_id}`);
      try {
      } catch (e) {
         console.log(e);
      }
   }

   async function handleChangeFile() {
      try {
         const formData = new FormData();
         //@ts-ignore
         formData.append("image", inputFileRef.current.files[0]);
         const { data } = await axios.post("/upload", formData);
         console.log("dataPost: ", data);
         setImageUrl(data.url);
      } catch (e) {
         alert("Ошибка при загрузке файла");
         console.log(e, "Файл не загружен");
      }
   }

   //!для SimpleEditor
   const onChange = React.useCallback((value: any) => {
      setText(value);
   }, []);
   const options = React.useMemo(
      () =>
         ({
            spellChecker: false,
            maxHeight: "400px",
            autofocus: true,
            placeholder: "Введите текст...",
            status: false,
            autosave: {
               enabled: true,
               delay: 1000,
            },
         } as any),
      []
   );

   // если обновить выкидывает со страницы тк еще не атроризован поэтому проверяем токен (запрос идет но на момент рендера приложения еще не авторизован).
   if (!window.localStorage.getItem("token") && !isAuth) {
      return <Navigate to="/" />;
   }

   return (
      <Paper elevation={6} className="p-14">
         <Button onClick={() => inputFileRef.current?.click()} variant="outlined" size="large">
            Загрузить превью
         </Button>
         <input onChange={handleChangeFile} ref={inputFileRef} type="file" hidden />
         {imageUrl && (
            <>
               <Button onClick={() => setImageUrl("")} variant="contained" color="error">
                  Удалить
               </Button>
               <img src={import.meta.env.VITE_APP_SERVER + imageUrl} className="w-full" alt="" />
            </>
         )}
         <br />
         <br />
         <TextField onChange={(e) => setTitle(e.target.value)} value={title} variant="standard" placeholder="Заголовок статьи..." fullWidth className="title" />
         <SimpleMDE value={text} onChange={onChange} className="editor" options={options} />
         <div className="flex gap-5">
            <Button onClick={onSumbit} variant="contained" color="primary">
               Опубликовать
            </Button>
            <Button variant="contained" onClick={() => navigate("/")} color="error">
               Отмена
            </Button>
         </div>
      </Paper>
   );
};
export default AddPost;
