import type { Metadata } from "next";
import { Mulish as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
   title: "Todo App",
   description: "A simple task management web application.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={cn(
               "relative h-screen font-sans w-full overflow-hidden bg-stone-100 antialiased",
               fontSans.variable
            )}
         >
            {children}
         </body>
      </html>
   );
}
