
import  prisma  from "@/app/lib/prisma";
import ProductsTable from "../productstable";


export default async function ProductsPage() {
 
  const products = await prisma.product.findMany();
  return (
    <ProductsTable productss={products} />
  );
}