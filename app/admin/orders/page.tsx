import OrderStatusSelect from "./orderStatuSelect";
import prisma from "@/app/lib/prisma";
import Link from "next/link";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          email: true,
        },
      },
      items: {
        include: {
          product: {
            select: {
              title: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Orders Management
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Products</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3"><Link href={`/admin/orders/${order.id}`} className="text-blue-600 hover:underline font-mediu">#{order.id}</Link></td>

                <td className="p-3">
                  {order.user.email}
                </td>

                <td className="p-3">
                  {order.items.map((item) => (
                    <p key={item.id}>
                      {item.product.title} × {item.quantity}
                    </p>
                  ))}
                </td>

                <td className="p-3">
                  Rs. {order.total.toLocaleString()}
                </td>

                <td className="p-3">
                 <OrderStatusSelect
                 orderId={order.id}
                 currentStatus={order.status}/>
                </td>

                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="p-5 text-center">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
