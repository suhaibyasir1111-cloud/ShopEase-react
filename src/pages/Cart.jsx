
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

function Cart () {
    const {cart}=useCart();
    const totalprice = cart.reduce((total,item)=>{
        return total + item.price
    },0)
        
    return (<div>
            <h3> price: ${totalprice}</h3>
            {cart.map((item)=>(
             <ProductCard
                product={item}
                isCart={true}
                />
            ))
            }
        </div>

    )
}
export default Cart;