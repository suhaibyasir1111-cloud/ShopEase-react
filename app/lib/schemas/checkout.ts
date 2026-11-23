import z from "zod";
export const shippingSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),

  phone: z.string().trim().min(10, "Enter a valid phone number").max(15),

  address: z.string().trim().min(10, "Enter complete address"),

  city: z.string().trim().min(2, "Enter your city"),

  postalCode: z.string().trim().min(4, "Enter valid postal code").max(10),
});
export  const checkoutSchema = z.object({

    items:z.array(z.object({
        productId:z.number().min(1),
        quantity:z.number().int() .positive()
    })).min(1),
    shipping:shippingSchema,
})
