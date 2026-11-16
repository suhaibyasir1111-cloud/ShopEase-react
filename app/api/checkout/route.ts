import { NextResponse } from "next/server";
import {checkoutSchema} from "@/app/lib/schemas/checkout";
import { checkout,CheckoutError } from "@/app/lib/checkout";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request: Request){
 try{
     const body = await request.json();
     const cookieStore = await cookies();
     const token= cookieStore.get("token")?.value;
     const secret = process.env.JWT_SECRET;
     if(!secret){
        throw new Error("JWT secret not found in environment variables");
     }
      if (!token) {

          return NextResponse.json({
                error: " unauthorizeded, token not found"
          }, { status: 401 });
      }
     let decode :jwt.JwtPayload;
     try{
        const result = jwt.verify(token, secret);
        if(typeof result === "string" || typeof result.userId !== "number"){
            return NextResponse.json({
                error:"invalid token payload"
        },{status:401});
     }

        decode = result;
        }catch{
            return NextResponse.json({
                error:"invalid token"
            },{status:401});
        }
        const userId = decode.userId;

     const result = checkoutSchema.safeParse(body);
     if (!result.success) {
        return NextResponse.json({ error:"invalid checkout data", details: result.error.issues }, { status: 400 }); }

     const { items}=result.data;
     const order = await checkout(userId, items);
   
     return NextResponse.json({message:"checkout successful", order  },{status:201});
    } catch (error){
  console.error("checkout error:", error);

  if (error instanceof CheckoutError) {
    return NextResponse.json(
      { error: error.message },
      { status: 409 }
    );
  }

  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
 }
       
}
