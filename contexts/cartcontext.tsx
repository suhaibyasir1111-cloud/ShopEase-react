"use client";

import { createContext, useContext, useState } from "react";
import type { Product } from "@/components/productcard";

const CartContext = createContext<CartContextType | null>(null);

type CartItem = Product & {
  quantity: number;
};
type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void
  removeFromCart:(id:number)=>void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  clearCart:()=>void;
}
export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

 function addToCart(product: Product){

   const existingProduct = cart.find(
      (item)=> item.id === product.id
   );

   if (existingProduct) {
     setCart((prev) =>
       prev.map((item) =>
         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
       )
     );
   } else {
     setCart((prev) => [...prev, { ...product, quantity: 1 }]);
   }
 }
  function removeFromCart(id:number){

   setCart((prev)=>
      prev.filter((item)=>item.id!==id)
   )
}
function increaseQuantity(id: number) {
  setCart(
    cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
}
function decreaseQuantity(id: number) {
  setCart(
    cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
}
function clearCart() {
  setCart([]);
}

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity ,clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context){
    throw new Error ("useCart must be inside a CartProvider")
  }
  return context;
}
