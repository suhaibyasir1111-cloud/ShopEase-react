"use client";
import {useCart} from "@/contexts/cartcontext";
import Link from "next/link";
import { usePathname , useRouter,useSearchParams} from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname= usePathname();
  const router = useRouter();
  const searchparams = useSearchParams();
  const [search , setSearch]=useState("");
  const {cart } = useCart();
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const query = search.trim();

  if (!query) return;

  const params = new URLSearchParams(searchparams.toString());

params.set("search", query);

router.push(`/productss?${params.toString()}`);
 //router.push(`/productss?search=${encodeURIComponent(query)}`);
}

  function handleSort(value: string) {
    const params = new URLSearchParams (searchparams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  }
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between">

        <h1 className="text-2xl font-bold">
          ShopEase
        </h1>

        <div className="flex gap-6">

          <Link href="/">
            Home
          </Link>

          <Link href="/productss">
            Products
          </Link>

          <Link href="/cart">
            Cart ({cart.length})
          </Link>

          <Link href="/login">
            Login
          </Link>
          
         <form onSubmit={handleSearch} className="flex gap-2">
           <input
           type="text"
           placeholder="Search products..."
           value={search}
           onChange={(e) => setSearch(e.target.value)}
           className="bg-white text-black px-3 py-2 rounded"
           />
          

           <button
           type="submit"
           className="bg-blue-800 px-4 py-2 rounded"
           >
           Search
           </button>
          </form>
            <select
                defaultValue={searchparams.get("sort") || "asc"}
                onChange={(e) => handleSort(e.target.value)}
                className="border rounded p-2 text-black"
               >
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
            </select>
            

        </div>

      </div>
    </nav>
  );
}