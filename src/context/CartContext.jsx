import { useContext } from "react";
import { createContext,useState,useEffect } from "react";


const CartContext = createContext();

function CartProvider ({children}){
const [cart , setcart ]= useState([]);
useEffect(()=>{
const data= localStorage.getItem("cart")
if (data) {
    setcart(JSON.parse(data))
}

},[])
useEffect(()=>{
const saved = JSON.stringify(cart);
localStorage.setItem("cart",saved)
},[cart])

const addtocart = (product)=>{
    setcart([
        ...cart,
        product

    ]) 
}
const removefromcart =(product)=>{
   
        const updateproduct = cart.filter((item)=>{
           return item.id !== product.id 
        })
       setcart(updateproduct);
    }

return (  <CartContext.Provider value={{cart, addtocart,removefromcart}}>
        {children}
    </CartContext.Provider>
)
}


export const useCart =()=> {
    return useContext(CartContext)}
    
export {CartProvider};