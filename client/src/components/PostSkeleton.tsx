import { Skeleton, Stack } from "@mui/material";

export const PostSkeleton = () => {
   return (
      <div className="border border-slate-300">
         <Stack spacing={1}>
            <Skeleton variant="rectangular" width="100%" height={300} />
            <div className="p-5">
               <div className="flex">
                  <Skeleton variant="circular" width={40} height={40} style={{ marginRight: 10, marginBottom: 10 }} />
                  <div className="flex flex-col">
                     <Skeleton variant="text" width={60} height={20} />
                     <Skeleton variant="text" width={100} height={15} />
                  </div>
               </div>
               <Skeleton variant="text" width="20%" height={45} />
               <Skeleton variant="text" width="100%" height={45} />
            </div>
         </Stack>
      </div>
   );
};
