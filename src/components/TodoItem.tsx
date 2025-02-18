import { Checkbox } from "@/components/ui/checkbox";

type Todo = {
   _id: string;
   title: string;
   completed: boolean;
};

export default function TodoItem({
   todo,
   toggleTodo,
}: {
   todo: Todo;
   toggleTodo: (id: string) => void;
}) {
   return (
      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
         <div className="flex items-center gap-3">
            <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo._id)} />
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
   );
}
