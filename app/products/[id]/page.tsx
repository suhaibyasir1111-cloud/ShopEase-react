import  prisma  from "@/app/lib/prisma";
import{ notFound} from "next/navigation";
export default async function ProductDetail({params}:{
  
  params: Promise<{id: string}>}) {
    const productId = Number((await params).id);
    const product = await prisma.product.findUnique({
      where:{
        id : productId
      },
      select:{
        title:true,
        price:true,
        image:true,
        description:true
      }
    })

    if (!product) {
      return notFound();
    }

  return (
     <main className="min-h-screen flex items-center justify-between bg-gray-100 p-8">
     <section>
      <img
        src={product.image}
        alt={product.title}
        className="w-96 h-96 object-cover rounded-lg shadow-md"
      />
     </section>
     <section>
       <h1 className="text-5xl font-bold">
         {product.title}
       </h1>
       <p className="text-2xl font-semibold text-gray-600 mt-4">
         ${product.price}
       </p>
       
       <p className="text-lg text-gray-700 mt-4">
         {product.description}
       </p>

     </section>
    </main>

  );
}
