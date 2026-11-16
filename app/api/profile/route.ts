import { NextResponse } from "next/server";
import getUserFromToken from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import auth from "@/app/lib/auth";



export async function GET() {
const user = await auth();
if (!user) {
  return NextResponse.json(
    {
      success: false,
      message: "Unauthorized",
    },
    { status: 401 }
  );
}


    return NextResponse.json({
      success: true,
      message: "Authenticated user",
      user:{
        id : user,
        email:user.email,
      },
    });
  } 
