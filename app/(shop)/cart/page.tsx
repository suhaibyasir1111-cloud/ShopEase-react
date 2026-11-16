
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cartcontext";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    setMessage("");
   

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Checkout failed");
        return;
      }
      const orderId = result.order.id;
      clearCart();
      router.push(`/order-success/${orderId}`);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  

  return (
    <main className="max-w-6xl mx-auto bg-gray-100 p-8 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className=" flex item-center justify-center bg-white rounded-lg p-8 text-center">
          { (
            <>
              <div className="mx-auto w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                 <ShoppingBag size={38} className="text-blue-600" />
             </div>

              <h2 className="text-xl font-semibold">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mt-3">
               Looks like you haven't added anything to your cart yet.
               Explore our products and find something you love.
              </p>
              <Link
                href="/productss"
                className="inline-block mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Continue Shopping
                <ArrowRight size={18}/>
              </Link>
            </>
            
          )}
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 mb-4 flex flex-col gap-6 bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain"
              />

              <div>
                <h2 className="font-bold">
                  {item.title}
                </h2>

                <p>Rs. {item.price.toLocaleString()}</p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Remove
                </button>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="border px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="border px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t pt-4">
            <h2 className="text-2xl font-bold">
              Total: Rs. {total.toLocaleString()}
            </h2>

            <button
              onClick={handleCheckout}
              disabled={loading || cart.length === 0}
              className="mt-5 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

            {message && (
              <p className="mt-3 text-red-600">
                {message}
              </p>
            )}
          </div>
        </>
      )}
    </main>
  );
}
}
