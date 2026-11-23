import type { ReactNode } from "react";
import Navbar from "@/components/navbar";

export default function ShopLayout({
  children,
}: {
  children: ReactNode;
})
{
  return (
    <div className="min-h-screen bg-white">
     <Navbar/>
      <header className="border-b p-4">
        <h1 className="text-xl font-bold">ShopEase Store</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}