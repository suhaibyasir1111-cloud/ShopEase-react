import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    }
  });

  return Response.json(user, { status: 201 });
}