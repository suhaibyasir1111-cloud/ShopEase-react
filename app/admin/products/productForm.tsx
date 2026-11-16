"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createProductSchema } from "@/app/lib/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
type ProductInput = z.infer<typeof createProductSchema>;
type Props = { product?: {
    id:number;
    title: string;
    category: string;
    description: string;
    price: number;
    stock: number;
    image: string;
  };
};
export default function ProductForm ({product}:Props){
  const router = useRouter();

const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [error, setError] = useState("");
const { register,handleSubmit,formState:{errors},}= useForm({
  resolver: zodResolver(createProductSchema),
  defaultValues: {
    title: product?.title ?? "",
    category: product?.category ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    image: product?.image ?? "",
  },
});
const onSubmit = async (data: ProductInput) => {
  setLoading(true);
  setMessage("");
  setError("");
  try{
  const url = product
    ? `/api/products/${product.id}`
    : "/api/products";

  const method = product ? "PATCH" : "POST";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
     setError(result.message || "Something went wrong");
    return;
  }

  setMessage(result.message|| "product saved successfully");
  router.push("/admin/products")
  router.refresh();
      
    

  } catch (error) {
    setError("Server connection failed");
  } finally {
    setLoading(false);
  }
};

return (
  <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text"  {...register("title")}placeholder="product name"/>
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      <input type="number" {...register("price",{valueAsNumber:true})}placeholder="product product price"/>
      {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      <input type="text" {...register("category")}placeholder="product category"/>
      {errors.category && <p className="text-red-500">{errors.category.message}</p>}
      <textarea {...register("description")}placeholder="product description"/>
      {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      <input type="number" {...register("stock",{valueAsNumber:true})}placeholder="product stock"/>
      {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
      <input type="text" {...register("image")}placeholder="product image"/>
      {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      {message && (<p className="text-green-600">{message}</p>)}
      {error && (<p className="text-red-500">{error}</p>)}
      <button type="submit" disabled={loading}> {loading ? "Saving...":product ?"save changes":"add product"} </button>
    </form>
  </div>
)
}