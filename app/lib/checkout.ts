import  prisma  from "./prisma";


 export async function checkout(userId:number, items:{productId:number, quantity:number}[]) {

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
    throw new Error("Product not found or insufficient stock");}

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
      throw new Error("User not found");
    }
    // Order create
    const order = await tx.order.create({ 
        data : {
            userId,
            total, 
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
    for (const product of products){
        await tx.product.update({
            where:{
                id:product.id
            },
            data:{
            stock:{
                decrement:product.quantity
            }
        }
    })
    return order;
  } 
 }
 );
  
}
export class CheckoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CheckoutError";
  }
}
