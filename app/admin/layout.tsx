import Link from "next/link";
import type { ReactNode } from "react";
import auth from "../lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
})

{
  const user= await auth();
  if (!user){
    redirect("/login")
  } 
  if (user.role!=="ADMIN"){
    redirect("/")
  }
  
  
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 p-6 text-white">
        <h2 className="mb-8 text-xl font-bold">
          ShopEase Admin
        </h2>

        <nav className="flex flex-col gap-5">
          <Link href="/admin/overview">Overview</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/orders">Orders</Link>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-8 text-gray-900">
        
        {children}
      </main>
    </div>
  );
}