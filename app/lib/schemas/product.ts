import { z } from "zod";

export const productSchema = z.object({
  id:z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  image: z.string().min(1),
  stock: z.number().int().nonnegative(),
  
});
 export const fakeStoreProductSchema = productSchema
  .omit({ stock: true })
  .extend({
    id: z.number().int().positive(),
  });

export const createProductSchema = productSchema.omit({
  id: true,
});

export const updateProductSchema = productSchema
  .omit({ id: true })
  .partial();