import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
   const navigate = useNavigate();

   return (
      <div className="h-[50vh] flex flex-col items-center justify-center">
         <h1 className="text-6xl font-bold mb-4 text-gray-800">404</h1>
         <h2 className="text-2xl mb-6">Page Not Found</h2>
         <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
         <div className="flex gap-4">
            <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
               Go Back
            </button>
            <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
               Go Home
            </Link>
         </div>
      </div>
   );
}
