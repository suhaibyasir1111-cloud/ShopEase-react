
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Package, ShoppingBag, ArrowRight } from "lucide-react";
import prisma from "@/app/lib/prisma";
import auth from "@/app/lib/auth";

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await auth();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;
  const orderId = Number(id);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    notFound();
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: user.id,
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              title: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">

          <div className="flex justify-center mb-5">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle2
                size={60}
                className="text-green-600"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-500 mt-3">
            Thank you for your purchase. Your order has been
            received successfully.
          </p>

          <div className="mt-7 bg-gray-50 rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Your Order Number
            </p>

            <h2 className="text-2xl font-bold text-blue-600 mt-1">
              #{order.id}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              {order.createdAt.toLocaleString("en-PK")}
            </p>
          </div>

          <div className="flex justify-between items-center mt-8 mb-4">
            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
              {order.status}
            </span>
          </div>

          <div className="border rounded-xl divide-y text-left">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="p-4 flex items-center gap-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {item.product.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6 border-t pt-5">
            <span className="text-lg font-semibold">
              Total Amount
            </span>

            <span className="text-2xl font-bold text-green-600">
              Rs. {order.total.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              href="/orders"
              className="flex-1 flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
            >
              <Package size={19} />
              View My Orders
            </Link>

            <Link
              href="/products"
              className="flex-1 flex justify-center items-center gap-2 border border-gray-300 hover:bg-gray-50 py-3 rounded-lg font-medium transition"
            >
              <ShoppingBag size={19} />
              Continue Shopping
              <ArrowRight size={17} />
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
