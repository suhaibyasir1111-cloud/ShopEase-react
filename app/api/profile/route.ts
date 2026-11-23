import { NextResponse } from "next/server";
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
        id : user.id,
        email:user.email,
      },
    });
  }