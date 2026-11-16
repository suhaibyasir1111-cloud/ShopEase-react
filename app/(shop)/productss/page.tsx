import ProductCard, { Product } from "../../../components/productcard";
import prisma from "../../lib/prisma";

 type Props = {
    searchParams:Promise<{ 
      search?:string,
      category?:string,
      sort?:string
    }>
  }
export default async function ProductsPage({searchParams}:Props) {
 
  const {search = "", category= "",sort = ""} = await searchParams;

  //const response = await fetch("https://fakestoreapi.com/products");
 // const contentType = response.headers.get("content-type");

 // if (!response.ok || !contentType?.includes("application/json")) {
  //  return <main>Products could not be loaded.</main>;
  //}

  const products : Product[] = await prisma.product.findMany({
    where:{
      title:{
        contains : search || "",
        mode:"insensitive",
      },
      ...(category && category !== "all"
        ? {category} : {}),
        price:{
          
        }
    },
 
  orderBy: sort === "price asc" ? { price:"asc"}
  :sort === "price desc" ? {price : "desc"} : {id:"desc"}
   });
  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Our Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {products.length === 0 ?(
          <p> no product found </p>
        ):(
        products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
          />
        ))
       )}
      </div>
    </main>
  );
}
