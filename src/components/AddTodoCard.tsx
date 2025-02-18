"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/lib/axios";
import { isAxiosError } from "axios";

const AddTodoCard = () => {
   const router = useRouter();
   const [task, setTask] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!task.trim()) return;

      try {
         setLoading(true);
         setError(null);
         await axios.post("/todos", { title: task });
         setTask("");
         router.push("/");
      } catch (err: unknown) {
         if (isAxiosError(err)) {
            setError(err.response?.data?.message || "Something went wrong.");
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="p-6 max-w-xl mx-auto">
         <h1 className="text-2xl font-bold mb-4 text-center">Have a Good Day</h1>
         <p className="text-gray-600 mb-8 text-center">
            Fuel your days with the boundless enthusiasm of a lifelong explorer.
         </p>

         <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
               type="text"
               value={task}
               onChange={(e) => setTask(e.target.value)}
               placeholder="Enter a task..."
               className="border-gray-300 dark:border-gray-600"
            />

            {error && <p className="text-red-500 text-center">{error}</p>}

            <Button
               type="submit"
               disabled={loading}
               className="bg-emerald-600 hover:bg-blue-700 text-white h-11"
            >
               Add Todo
            </Button>
         </form>
      </div>
   );
};

export default AddTodoCard;
