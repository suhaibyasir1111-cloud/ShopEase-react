
"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  id: number;
  productId: number;
  quantity: number;
  price: number;
};

type Order = {
  id: number;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/orders");

        if (!response.ok) {
          throw new Error(
            response.status === 401
              ? "Please login to view your orders."
              : "Failed to load orders."
          );
        }

        const data: { orders: Order[] } =
          await response.json();

        setOrders(data.orders);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="p-6">Loading your orders...</p>;
  }

  if (error) {
    return (
      <p className="p-6 text-red-600">
        {error}
      </p>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-lg border p-4"
            >
              <div className="flex justify-between gap-4">
                <h2 className="font-semibold">
                  Order #{order.id}
                </h2>

                <span>{order.status}</span>
              </div>

              <p className="mt-2">
                Total: Rs. {order.total.toLocaleString()}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(
                  order.createdAt
                ).toLocaleString()}
              </p>

              <div className="mt-3">
                <h3 className="font-medium">
                  Items
                </h3>

                {order.items.map((item) => (
                  <p key={item.id} className="text-sm">
                    Product #{item.productId}
                    {" — "}Qty: {item.quantity}
                    {" — "}Rs. {item.price.toLocaleString()}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
