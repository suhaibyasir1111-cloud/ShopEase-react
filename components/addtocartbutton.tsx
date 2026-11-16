"use client";
import {useCart} from "@/contexts/cartcontext";
import { Product } from "./productcard";
import { useCallback,  } from "react";

const AddToCartButton = ( {product}:{product:Product} ) => {
  const { addToCart } = useCart();/*const cart = useCart();
  if(!cart){
    return null;
  }
  const {addToCart} = cart*/
  const handleAddToCart = useCallback(()=>{
    addToCart(product);
  }, [addToCart]);


  
  return ( 

    <button onClick= {handleAddToCart}
    
      className="bg-blue-600 text-white w-full py-2 rounded mt-4 hover:bg-blue-700"
    >
      Add To Cart

    </button>
    

  );
}

export default AddToCartButton;
