"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import axios from "@/lib/axios";
import { Plus } from "lucide-react";

type Todo = {
   _id: string;
   title: string;
   completed: boolean;
};

export default function TodoList() {
   const [todos, setTodos] = useState<Todo[]>([]);

   const toggleTodo = (id: string) => {
      setTodos((prev) =>
         prev.map((todo) => (todo._id === id ? { ...todo, completed: !todo.completed } : todo))
      );
   };

   useEffect(() => {
      axios.get("/todos").then((res) => {
         setTodos(res.data);
      });
   }, []);

   return (
      <>
         <h1 className="pb-8 text-2xl font-semibold text-gray-900 dark:text-white text-center">
            📌 To-Do List
         </h1>

         <div className="flex justify-center">
            <Link
               href="/todos/create"
               className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
               <Plus size={16} />
               <span>Add Todo</span>
            </Link>
         </div>

         <div className="mt-4 space-y-3">
            {todos.length === 0 ? (
               <p className="text-center text-gray-500 dark:text-gray-400">
                  No tasks yet. Add some! ✨
               </p>
            ) : (
               todos.map((todo) => (
                  <div
                     key={todo._id}
                     className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                     <div className="flex items-center gap-3">
                        <Checkbox
                           checked={todo.completed}
                           onCheckedChange={() => toggleTodo(todo._id)}
                        />
                        <span
                           className={`text-lg ${
                              todo.completed
                                 ? "line-through text-gray-400 dark:text-gray-500"
                                 : "text-gray-900 dark:text-gray-100"
                           }`}
                        >
                           {todo.title}
                        </span>
                     </div>
                  </div>
               ))
            )}
         </div>
      </>
   );
}
