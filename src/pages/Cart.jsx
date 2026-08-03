
import { useCart } from "../context/CartContext";

import CartItem from "../components/CartItem"

function Cart () {
    const {cart}=useCart();
    const totalprice = cart.reduce((total,item)=>{
        return total + item.price
    },0)
        
    return (<div className="max-w-7xl mx-auto px-6 py-10 bg-gray-100  hover:shadow-lg transition-all duration-200">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>

          <div className="bg-white shadow-md rounded-xl p-5 mb-8 flex justify-between items-center sticky top-10">
    <h2 className="text-2xl font-bold">
        Total
    </h2>

    <h2 className="text-3xl font-bold text-blue-600">
        ${totalprice.toFixed(2)}
    </h2>
</div>
            {cart.map((item)=>(
             <CartItem
             key={item.id}
                product={item}
                isCart={true}
                
                />
                
            ))
            }
        </div>

    )
}
export default Cart;