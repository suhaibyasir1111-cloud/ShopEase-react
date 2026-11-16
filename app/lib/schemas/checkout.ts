import z from "zod";
export  const checkoutSchema = z.object({
    
    items:z.array(z.object({
        productId:z.number().min(1),
        quantity:z.number().int() .positive()
    })).min(1)
})