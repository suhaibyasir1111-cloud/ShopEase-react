
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import auth from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

const allowedStatuses = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Authentication
    const user = await auth();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Admin authorization
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    // 3. Validate order ID
    const { id } = await params;
    const orderId = Number(id);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json(
        { error: "Invalid order ID" },
        { status: 400 }
      );
    }

    // 4. Read request body
    const body = await request.json().catch(() => null);

    const { status } = body ?? {};

    if (
      typeof status !== "string" ||
      !allowedStatuses.includes(status)
    ) {
      return NextResponse.json(
        { error: "Invalid order status" },
        { status: 400 }
      );
    }

    // 5. Check order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // 6. Update status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    revalidatePath("/admin/order");
    revalidatePath(`/admin/order/${orderId}`);
    revalidatePath("/orders");

    return NextResponse.json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });

  } catch (error) {
    console.error("Update order status error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
