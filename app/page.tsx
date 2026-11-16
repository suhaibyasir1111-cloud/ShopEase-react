import Image from "next/image";

import prisma from "@/app/lib/prisma";
import Link from "next/link";
import AddToCartButton from "@/components/addtocartbutton";

export default async function Home() {
  const products = await  prisma.product.findMany({
    orderBy:{
      createdAt:"desc"
    },
    where:{
      stock: {
        gt: 0
      }
    },
    take: 4,
    
    select: {
      id: true,
      title: true,
      price: true,
      image: true,
    },
  });

  return (
    <>
    <main className="max-w-7xl  bg-gray-100 gap-x-4 relative">
      <section className=" flex flex-col items-start gap-4 bg-blue-100 p-8">
        <h1 className="text-5xl font-bold text-blue-600">
          Welcome to ShopEase
        </h1>
        <p className="text-lg text-gray-600">Discover best quality products at unbeatable prices. Shop your everyday essentials with ease.</p>
        <Link href="/productss" className="bg-blue-500 text-white  rounded hover:bg-blue-600 p-4 font-semibold inline-block">
          Explore Products
        </Link>
      </section>
      <section className="p-12">    
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
          <p className="text-gray-600 mt-2">Explore our latest products and find your next favorite!</p>
        </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6">
        { products.map((item) => {
          const imageSrc =
            item.image?.startsWith("https://fakestoreapi.com/")
              ? item.image
              : "/placeholder.svg";

          return (
            <div key={item.id} className=" flex flex-col rounded-xl border border-gray-200 bg-white p-4  shadow-sm  ">
              <div className="flex items-center justify-center bg-gray-50  h-full w-full object-cover rounded-xl">
              <Image
                src={imageSrc}
                alt={item.title}
                width={200}
                height={200}
              />
              </div>

              <h2 className="text-xl font-bold line-clamp-2">
                {item.title}
              </h2>

              <p className="text-lg text-blue-400 font-semibold mt-auto">
                ${item.price.toFixed(2)}
              </p>
              <Link href={`/products/${item.id}`} className="mt-4 text-blue-500 hover:text-blue-700">
                View Details
              </Link>
              <AddToCartButton product={item} />
             
            </div>
          );
        })}
      </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
        <h2 className="text-2xl font-bold text-gray-800 col-span-full">why choose ShopEase </h2>
        <div className="bg-white p-6 rounded-xl shadow-sm"> 
          <h3> Quality Products</h3>
          <p>we offer only the best quality products for everydays needs</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3> Easy Shipping</h3>
          <p>simple and convenient shipping options for all your purchases</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3> Secure Checkout</h3>
          <p>protected with the latest security measures to keep your information safe</p>
        </div>
      </section>
    </main> 
    <footer >
    <div className="bg-gray-800 text-white p-8 flex  justify-between">
      <h2> ShopEase</h2>
      <p> your everday shopping companion</p>
    </div>
    <div className="bg-gray-900 text-white p-8 flex justify-between">
    <div className="flex flex-col gap-2">
      <h3 >Quick links</h3>
      <Link href="/">home</Link>
      <Link href="/productss">products</Link>
      <Link href="/cart">cart</Link>
    </div>
    <div>
      <h3>Contact</h3>
      <p>Email:info@gamil.com</p>
      <p>Customer Support</p>
    </div>
    </div>
    <p className="bg-gray-950 text-white flex items-center justify-center p-4">2026 ShopEase. All rights reserved.</p>
    </footer >
    </>
  );
  
}
