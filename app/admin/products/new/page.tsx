"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductSchema,
} from "@/app/lib/schemas/product";
import { z } from "zod";

type ProductInput = z.infer<typeof createProductSchema>;
export default  function NewProductPage() {
  const { register, handleSubmit,formState: { errors },} = useForm<ProductInput>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = (data: ProductInput) => {
    console.log("form data",data)
     fetch("/api/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} >
        {/* Form fields yahan banayenge */}
        <input type="text" placeholder="Product Name" {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <input type="text" placeholder="Category" {...register("category")} />
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
        <input type="textarea" placeholder="Description" {...register("description")} />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        <input type="number" placeholder="Price" {...register("price", { valueAsNumber: true })} />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        <input type="number" placeholder="Stock" {...register("stock", { valueAsNumber: true })} />
        {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
        <input type="text" placeholder="Image URL" {...register("image")} />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        <button type="submit" > Add Product</button>
      </form >
    </div>
  );
}