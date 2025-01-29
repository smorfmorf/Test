import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import clsx from "clsx";

createRoot(document.getElementById("root")!).render(
   <BrowserRouter>
      <Provider store={store}>
         {/* <Cirlce /> */}
         <App />
      </Provider>
   </BrowserRouter>
);

function Cirlce() {
   const [data, setData] = React.useState([
      { id: 1, value: "", flag: false },
      { id: 2, value: "", flag: false },
      { id: 3, value: "", flag: false },

      { id: 4, value: "", flag: false },
      { id: 5, value: "", flag: false },
      { id: 6, value: "", flag: false },

      { id: 7, value: "", flag: false },
      { id: 8, value: "", flag: false },
      { id: 9, value: "", flag: false },
   ]);

   const [isX, setIsX] = React.useState(true);

   function click(item) {
      if (item.value) return;

      setData((prev) => prev.map((i) => (i.id === item.id ? { ...i, value: isX ? "X" : "O" } : i)));

      setIsX(!isX);
      checkWinner();
   }
   const checkWinner = () => {
      const lines = [
         //Это массив выигрышных комбинаций для игры в крестики-нолики!
         [0, 1, 2], // → горизонталь сверху
         [3, 4, 5], // → горизонталь в середине
         [6, 7, 8], //→ горизонталь снизу

         [0, 3, 6], //→ вертикаль слева
         [1, 4, 7], //→ вертикаль в центре
         [2, 5, 8], //→ вертикаль справа

         [0, 4, 8], //→ диагональ слева-направо
         [2, 4, 6], //→ диагональ справа-налево
      ];

      for (let line of lines) {
         const [a, b, c] = line;
         console.log("dataValue", data[a].value);

         if (data[a].value && data[a].value === data[b].value && data[a].value === data[c].value) {
            alert(`Победил ${data[a].value}!`);
            setData((prev) => prev.map((i) => ({ ...i, value: "" })));
            return;
         }
      }
   };

   return (
      <div className="border border-red-500 p-10 w-4/5 mx-auto mt-10">
         <div className="grid grid-cols-3 gap-4">
            {data.map((item) => (
               <div key={item.id} onClick={() => click(item)} className={clsx("border border-blue-500 p-4 text-center h-20", "flex items-center justify-center text-3xl font-bold", "cursor-pointer hover:bg-blue-100")}>
                  {item.value}
               </div>
            ))}
         </div>
      </div>
   );
}
