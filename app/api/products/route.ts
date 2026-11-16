import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import auth from "@/app/lib/auth";
import { createProductSchema } from "@/app/lib/schemas/product";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request:Request) {
  const user = await auth();
  if(!user){
    return NextResponse.json({message:"unauthorizes"},{status:401})
  }
  if(user.role!=="ADMIN"){
    return NextResponse.json({message:"forbiden acess "},{status:403})
  }
  
  //let response: Response;
  try {
    const body = await request.json();

    const result = createProductSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.issues },
        { status: 400 }
      );
    }
    const product = await prisma.product.create({
      data: result.data,
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create product error:", error);

    return NextResponse.json(
      { message: "Product creation failed" },
      { status: 500 }
    );
  }
}

  
    /*response = await fetch("https://fakestoreapi.com/products");
  } catch (error) {
    console.error("POST /api/products upstream request failed:", error);
    return NextResponse.json(
      {
        error: "Unable to reach the external product API",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 502 }
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: `External product API returned HTTP ${response.status}` },
      { status: 502 }
    );
  }
  let products: unknown;
  try {
    products = await response.json();
  } catch (error) {
    console.error("POST /api/products returned invalid JSON:", error);
    return NextResponse.json(
      { error: "External product API returned invalid JSON" },
      { status: 502 }
    );
  }

  const result = z.array(fakeStoreProductSchema).safeParse(products);
  if (!result.success) {
    return NextResponse.json(
      { error: "External product API returned an unexpected product format" },
      { status: 502 }
    );
  }

  try {
    const savedProducts = [];
    for (const product of result.data) {
      const savedProduct = await prisma.product.upsert({
        where: {
          externalId: product.id,
        },
        update: {
          title: product.title,
          description: product.description,
          price: product.price,
          category: product.category,
          image: product.image,
        },
        create: {
          externalId: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          category: product.category,
          image: product.image,
          stock: 100,
        },
      });
      savedProducts.push(savedProduct);
    }

    return NextResponse.json({
      message: "Products imported successfully",
      count: savedProducts.length,
      product: savedProducts,
    });
  } catch (error) {
    console.error("POST /api/products database import error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Product import failed" },
      { status: 500 }
    );
  }
    */
