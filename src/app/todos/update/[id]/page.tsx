import Header from "@/components/Header";
import UpdateTodoCard from "@/components/UpdateTodoCard";

export default function CreateTodo() {
   return (
      <main className="py-6 container min-h-full flex flex-col gap-6 content-start">
         <Header />

         <main className="p-6 bg-background shadow-card rounded-xl">
            <UpdateTodoCard />
         </main>
      </main>
   );
}
