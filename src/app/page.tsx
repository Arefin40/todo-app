export default function Home() {
   return (
      <main className="py-6 container min-h-full grid grid-cols-[1fr_24rem] gap-6 content-start grid-rows-[auto_1fr]">
         <header className="relative p-6 h-80 bg-background shadow-card rounded-xl col-start-1 col-span-1 overflow-hidden">
            <h1>Hello World</h1>
         </header>

         <aside className="p-6 bg-background shadow-card rounded-xl col-start-2 col-span-1 row-span-full">
            Sidebar
         </aside>

         <main className="p-6 bg-background shadow-card rounded-xl col-start-1 col-span-1">
            Main
         </main>
      </main>
   );
}
