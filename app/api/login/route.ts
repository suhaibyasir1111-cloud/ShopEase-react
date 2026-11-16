import { NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function POST(request: Request) {
  const body = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid email or password",
      },
      { status: 401 }
    );
  }

  const passwordMatch = await bcrypt.compare(
    body.password,
    user.password
  );

  if (!passwordMatch) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid email or password",
      },
      { status: 401 }
    );
  }
  const token = jwt.sign(
  {
    userId: user.id,
    email: user.email,
    role:user.role
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: "1h",
  }
);

  
  const response= NextResponse.json({
    success: true,
    message: "Login successful",
    
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      
    },
  });

  response.cookies.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60,
  path: "/",
});
 return response;
}