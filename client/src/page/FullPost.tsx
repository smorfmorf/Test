import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import { Post } from "../components/Post";
import { PostsItem } from "../store/postsSlice";
import { Button } from "@mui/material";

const FullPost = () => {
   const { id } = useParams<{ id: string }>();
   console.log("id: ", id);
   const [post, setPost] = React.useState<PostsItem>();
   console.log("post: ", post);

   const navigate = useNavigate();

   React.useEffect(() => {
      async function fetchPizza() {
         try {
            const { data } = await axios.get<PostsItem>(`/api/posts/${id}`);
            setPost(data);
         } catch (err) {
            alert("Ошибка при загрузке поста");
            navigate("/");
         }
      }
      fetchPizza();
   }, []);

   if (!post) {
      return <div>Загрузка...</div>;
   }

   return (
      <div className="flex flex-col gap-5">
         <Link to="/">
            <Button variant="contained" color="inherit">
               Вернуться на главную
            </Button>
         </Link>
         <Post {...post} isFullPost={true} />
      </div>
   );
};
export default FullPost;
//   <ReactMarkdown children={data.text} /> передать в props вот так
