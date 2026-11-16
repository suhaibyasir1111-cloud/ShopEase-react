import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    // 1. Prisma se all products fetch karo
const products = await prisma.product.findMany();

    // 2. Products ko JSON response mein return karo
    return new Response(JSON.stringify(products), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
   return Response.json({ message: "Server error" }, { status: 500 });

    // 3. Error response return karo

  }
}