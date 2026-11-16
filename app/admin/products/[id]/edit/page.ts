import prisma from "@/app/lib/prisma";
import ProductForm from "@/app/admin/products/productForm";
import { createElement } from "react";
import { notFound } from "next/navigation";


export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const productId = Number(id);

 if (!Number.isInteger(productId) || productId <= 0) {
  notFound();
}

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) notFound();

  return createElement(ProductForm, { product });
}