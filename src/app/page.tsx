import TodoList from "@/components/TodoList";
import Header from "@/components/Header";

export default function Home() {
   return (
      <main className="py-6 container min-h-full flex flex-col gap-6 content-start">
         <Header />

         <main className="p-6 bg-background shadow-card rounded-xl col-start-1 col-span-1">
            <TodoList />
         </main>
      </main>
   );
}
