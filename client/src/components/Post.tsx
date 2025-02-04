import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Clear";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

import React from "react";
import { PostSkeleton } from "./PostSkeleton";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { deletePosts } from "../store/postsSlice";

interface Props {
   id: number;
   title: string;
   createdAt: string;
   text: string;
   imageUrl: string;
   author: any;
   isEditable?: boolean;
   isLoading?: boolean;
   isFullPost?: boolean;
}

export const Post: React.FC<Props> = ({ id, imageUrl, title, createdAt, text, author, isEditable, isLoading, isFullPost }) => {
   console.log("imageUrl132123213: ", imageUrl);
   console.log("meta.env.VITE_APP_SERVER: ", import.meta.env.VITE_APP_SERVER + imageUrl);
   const dispatch = useAppDispatch();

   if (isLoading) {
      return <PostSkeleton />;
   }

   function deletePost() {
      dispatch(deletePosts(id));
   }
   return (
      <article key={id} className="group relative border border-slate-200 rounded-xl shadow-xl overflow-hidden hover:-translate-y-2 transition hover:border-blue-500">
         {isEditable && (
            <div className="z-10 absolute top-2 right-3 bg-gray-200 rounded-xl transition opacity-0 group-hover:opacity-100">
               <Link to={`/add-post/${id}`}>
                  <IconButton color="primary">
                     <EditIcon />
                  </IconButton>
               </Link>
               <IconButton color="secondary" onClick={deletePost}>
                  <DeleteIcon />
               </IconButton>
            </div>
         )}

         {imageUrl && imageUrl.endsWith(".mp4") ? (
            <video controls className={clsx("w-full h-[300px] object-cover rounded-md  ", { "min-h-[300px] h-full": isFullPost })}>
               <source src={import.meta.env.VITE_APP_SERVER + imageUrl} type="video/mp4" />
               Your browser does not support the video tag.
            </video>
         ) : (
            <img src={imageUrl ? import.meta.env.VITE_APP_SERVER + imageUrl : "test.jpg"} className={clsx("w-full h-[300px] object-cover rounded-md ", { "min-h-[300px] h-full": isFullPost })} alt="" />
         )}

         {/* UserInfo */}
         <div className="bg-white/50 p-5">
            <div className="flex items-center gap-3 mb-5">
               <img src="/noavatar.png" className="w-10 h-10 " />
               <div className="flex flex-col">
                  <span className="font-bold">{author.fullName}</span>
                  <span className="text-slate-400">{new Date(createdAt).toLocaleString("ru-RU")}</span>
               </div>
            </div>
            <div>
               <Link to={`/posts/${id}`}>
                  <h2 className="mb-3 text-2xl font-bold">
                     <ReactMarkdown>{title}</ReactMarkdown>
                  </h2>
               </Link>
               <div className="text-slate-400">
                  <ReactMarkdown>{text}</ReactMarkdown>
               </div>
            </div>
         </div>
      </article>
   );
};
