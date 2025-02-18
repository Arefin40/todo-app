"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/lib/axios";
import { isAxiosError } from "axios";
import { Checkbox } from "@/components/ui/checkbox";

type Todo = {
   _id: string;
   title: string;
   completed: boolean;
};

const UpdateTodoCard = () => {
   const router = useRouter();
   const params = useParams<{ id: string }>();
   const todoId = params?.id || "";

   const [todo, setTodo] = useState<Todo | null>(null);

   const setTitle = (title: string) => {
      if (!todo) return;

      setTodo((prevTodo) => ({
         ...prevTodo!,
         title: title,
      }));
   };

   const setCompleted = (isComplete: boolean) => {
      if (!todo) return;

      setTodo((prevTodo) => ({
         ...prevTodo!,
         completed: isComplete,
      }));
   };

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   console.log("todoId " + todoId);

   // Fetch Todo Data
   useEffect(() => {
      if (!todoId) return;

      const fetchTodo = async () => {
         try {
            const response = await axios.get(`/todos/${todoId}`);
            setTodo(response.data);
         } catch (err: unknown) {
            if (isAxiosError(err)) {
               setError("Failed to load task details.");
            }
         }
      };

      fetchTodo();
   }, [todoId]);

   // Handle Update Submission
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!todo?.title.trim()) return;

      try {
         setLoading(true);
         setError(null);
         await axios.patch(`/todos/${todoId}`, { title: todo.title, completed: todo.completed });

         router.push("/");
      } catch (err: unknown) {
         if (isAxiosError(err)) {
            setError(err.response?.data?.message || "Failed to update task.");
         } else {
            setError("An unexpected error occurred.");
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="p-6 max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg">
         <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
            ✏️ Update Task
         </h1>
         <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
            Make changes to your existing task.
         </p>

         {error && <p className="text-red-500 text-center">{error}</p>}

         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
               type="text"
               value={todo?.title || ""}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="Update your task..."
               className="border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg"
            />

            <div className="flex items-center gap-x-2">
               <Checkbox
                  checked={todo?.completed}
                  onCheckedChange={() => setCompleted(!todo?.completed)}
               />
               <span>Is Completed?</span>
            </div>

            <div className="flex gap-4">
               <Button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white h-11 w-full rounded-lg"
                  onClick={() => router.push("/")}
               >
                  Cancel
               </Button>

               <Button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-11 w-full rounded-lg transition-all duration-200"
               >
                  {loading ? "Updating..." : "Update Task"}
               </Button>
            </div>
         </form>
      </div>
   );
};

export default UpdateTodoCard;
