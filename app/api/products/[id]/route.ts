import prisma from "@/app/lib/prisma";
import { productSchema } from "@/app/lib/schemas/product";
import { revalidatePath } from "next/cache";
import auth from "@/app/lib/auth";

import { NextResponse } from "next/server";
export async function PATCH(request:Request,{params}:{params: Promise<{id:string}>}) {

   const user = await auth();
   if(!user){
    return NextResponse.json({message:"unakuthorexid"},{status:401})
   }
   if(user.role !== "ADMIN"){
    return NextResponse.json({
      message:"forbiden:admin only"
    },{status:403})
   }
   
    const {id}= await params; 
    const productId = Number(id);
    if (!Number.isInteger(productId) || productId <= 0) {
  return NextResponse.json(
    { message: "Invalid product ID" },
    { status: 400 }
  );
}
    const body = await request.json();
    const result = productSchema.partial().safeParse(body);
    if (!result.success) {
        return Response.json({error: result.error.issues}, {status: 400});
    }
    const product =await prisma.product.update({
      
        where:{
            id:productId
        },
        data: result.data
        /*{
            stock:body.stock
        }*/
    })
    revalidatePath("/products");
    return Response.json({product})
}
export async function DELETE(request:Request,{ params }: { params: Promise<{ id: string }> }
) {
  const user = await auth();

if (!user) {
  return NextResponse.json(
    { message: "Unauthorized" },
    { status: 401 }
  );
}
if (user.role !== "ADMIN") {
  return NextResponse.json(
    { message: "Forbidden: Admin only" },
    { status: 403 }
  );
}
  const {id}  = await params;
  const productid = Number(id);
  if (!Number.isInteger(productid) || productid <= 0) {
  return NextResponse.json(
    { message: "Invalid product ID" },
    { status: 400 }
  );
}
  //const body = await request.json();
  //const result =await productSchema.partial().safeParse(body);
  //if(!result.success){
   //  return Response.json({error: result.error.issues}, {status: 400});
  //}
   //if (!Number.isInteger(productid) || productid <= 0) {
      //return NextResponse.json(
        //{ message: "Invalid product ID" },
        //{ status: 400 }
      //);
    //}
    try{
  const product = await prisma.product.delete({
    where: {
      id: productid
    }
  });
  revalidatePath("/products");
  revalidatePath("/admin/products")
  return Response.json({
    success: true,
    message: "Product deleted successfully",
    product
  });
 } catch (error) {
   if (
    error instanceof Error &&
    "code" in error &&
    error.code === "P2025"
  ) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  console.error("DELETE product error:", error);

  return NextResponse.json(
    { message: "Product deletion failed" },
    { status: 500 }
  );
}
}
