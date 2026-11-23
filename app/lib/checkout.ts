import  prisma  from "./prisma";

type ShippingInfo = {
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};
 export async function checkout(userId:number, items:{productId:number, quantity:number}[],shipping:ShippingInfo) {

  return await prisma.$transaction(async (tx) => {
    const products:any[] =[];
    for (const item of items){
    const product = await tx.product.findFirst({
        where:{
            id:item.productId,
             stock:{
            gte:item.quantity
        }
        },
       
    })
    if(!product){
    throw new CheckoutError("Product not found or insufficient stock");}

    products.push({ ...product,quantity: item.quantity })
 }
 const total= products.reduce((sum, cur) => sum + (cur.price * cur.quantity), 0);

    //user find
   const user = await tx.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new CheckoutError("User not found");
    }
    // Order create
    const order = await tx.order.create({ 
        data : {
            userId,
            total, 
            shippingName: shipping.name,
            shippingAddress: shipping.address,
            shippingCity: shipping.city,
            shippingPostalCode: shipping.postalCode,
            shippingPhone: shipping.phone,
        }
    })
    // OrderItem create
 for (const product of products){
    await tx.orderItem.create({
        data:{
            orderId:order.id,
            productId:product.id,
            quantity:product.quantity,
            price:product.price
        }
    });
 }
    // Stock decreas
  for (const product of products) {
  const stockUpdate = await tx.product.updateMany({
    where: {
      id: product.id,
      stock: {
        gte: product.quantity
      }
    },
    data: {
      stock: {
        decrement: product.quantity
      }
    }
  });

  if (stockUpdate.count === 0) {
    throw new CheckoutError(
      "Product not found or insufficient stock"
    );
  }
}
   return order;
 }
 );
  
}
export class CheckoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CheckoutError";
  }
}
