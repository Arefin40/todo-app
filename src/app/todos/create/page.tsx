import Header from "@/components/Header";
import AddTodoCard from "@/components/AddTodoCard";

export default function CreateTodo() {
   return (
      <main className="py-6 container min-h-full flex flex-col gap-6 content-start">
         <Header />

         <main className="p-6 bg-background shadow-card rounded-xl">
            <AddTodoCard />
         </main>
      </main>
   );
}
