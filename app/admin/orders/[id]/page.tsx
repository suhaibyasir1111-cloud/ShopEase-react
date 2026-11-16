
import prisma from "@/app/lib/prisma";
import { notFound } from "next/navigation";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderId = Number(id);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    notFound();
  }

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Order Details #{order.id}
      </h1>

      <div className="bg-white border rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Customer Information
        </h2>

        <p>Email: {order.user.email}</p>

        <p className="mt-2">
          Order Date:{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>

        <p className="mt-2">
          Status: {order.status}
        </p>
      </div>

      <div className="bg-white border rounded-lg p-5">
        <h2 className="text-xl font-semibold mb-4">
          Ordered Products
        </h2>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium">
                  {item.product.title}
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p>
                Rs. {item.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="text-right mt-5">
          <p className="text-xl font-bold">
            Total: Rs. {order.total.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
