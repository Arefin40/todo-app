"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import axios from "@/lib/axios";
import TodoItem from "@/components/TodoItem";

type Todo = {
   _id: string;
   title: string;
   completed: boolean;
};

export default function TodoList() {
   const [todos, setTodos] = useState<Todo[]>([]);
   const [updated, setUpdated] = useState(false);
   const [loading, setLoading] = useState(true);

   const triggerReload = () => setUpdated(!updated);

   const toggleTodo = async (todo: Todo) => {
      try {
         await axios.patch(`/todos/${todo._id}`, { completed: !todo.completed });
         triggerReload();
      } catch (error) {
         console.error("Failed to update todo:", error);
      }
   };

   useEffect(() => {
      const fetchTodos = async () => {
         try {
            setLoading(true);
            const response = await axios.get("/todos");
            setTodos(response.data);
         } catch (err: unknown) {
            console.log(err);
         } finally {
            setLoading(false);
         }
      };
      fetchTodos();
   }, [updated]);

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
            {loading ? (
               <p className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
                  Loading tasks...
               </p>
            ) : todos.length === 0 ? (
               <p className="text-center text-gray-500 dark:text-gray-400">
                  No tasks yet. Add some! ✨
               </p>
            ) : (
               todos.map((todo) => (
                  <TodoItem
                     key={todo._id}
                     todo={todo}
                     toggleTodo={toggleTodo}
                     triggerReload={triggerReload}
                  />
               ))
            )}
         </div>
      </>
   );
}
