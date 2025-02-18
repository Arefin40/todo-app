import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit2, Trash2 } from "lucide-react";
import axios from "@/lib/axios";

type Todo = {
   _id: string;
   title: string;
   completed: boolean;
};

export default function TodoItem({
   todo,
   toggleTodo,
   triggerReload,
}: {
   todo: Todo;
   toggleTodo: (todo: Todo) => void;
   triggerReload: () => void;
}) {
   const deleteTodo = async () => {
      try {
         await axios.delete(`/todos/${todo._id}`);
         triggerReload();
      } catch (error) {
         console.error("Failed to delete todo:", error);
      }
   };

   return (
      <div className="max-w-xl mx-auto flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
         <div className="flex items-center gap-3 justify-between w-full">
            <div className="flex items-center gap-x-4">
               <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo)} />
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

            <div className="flex items-center gap-x-3">
               <Link
                  href={`/todos/update/${todo._id}`}
                  className="size-9 rounded-full bg-gray-100 flex items-center justify-center"
               >
                  <Edit2 className="size-4" />
               </Link>

               <button
                  onClick={deleteTodo}
                  className="size-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
               >
                  <Trash2 className="size-4" />
               </button>
            </div>
         </div>
      </div>
   );
}
