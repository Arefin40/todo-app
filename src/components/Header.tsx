import Image from "next/image";

export default function Header() {
   return (
      <header className="relative p-6 h-80 bg-background shadow-card rounded-xl col-start-1 col-span-1 overflow-hidden">
         <Image
            fill
            priority
            src={`/Cover.jpg`}
            alt="Cover Photo"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full object-cover"
         />
      </header>
   );
}
