import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { fakeStoreProductSchema } from "@/app/lib/schemas/product";
import z from "zod";
import auth from "@/app/lib/auth";

export async function POST() {
  const user = await auth();

if (!user) {
  return NextResponse.json(
    { message: "Unauthorized" },
    { status: 401 }
  );
}

if (user.role !== "ADMIN") {
  return NextResponse.json(
    { message: "Forbidden access" },
    { status: 403 }
  );
}
  let response: Response;
    try {
    response = await fetch("https://fakestoreapi.com/products");
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
}