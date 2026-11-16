import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "./prisma";
type TokenPayload = jwt.JwtPayload & {
  userId: number;
  email: string;
};
//export function getUserFromToken(request: Request) {
  //const cookieHeader = request.headers.get("cookie");
//
  //const token = cookieHeader
    ///?.split("; ")
    //.find((row) => row.startsWith("token="))
    //?.split("=")[1];
export default async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }
  let decoded : TokenPayload;
  try {
     const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) 
    if( typeof payload === "string" || typeof payload.userId!=="number"){
      return null;
    }
    decoded = {
      userId:payload.userId,
      email:payload.email,
      

    };
  } catch {
    return null;
  }
  const user = await prisma.user.findUnique({
    where:{
      id:decoded.userId
    }
  })

  if(!user) {
   return null;
  }
  return user;
};