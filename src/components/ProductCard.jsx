
import { useCart } from "../context/CartContext";
import {Link} from "react-router-dom";
import {memo} from "react";


function ProductCard ({product,isCart}){ 

    const {addtocart,removefromcart}=useCart();
    
    let button;
    if (isCart){
       button = (<button className="bg-blue-600 text-white px-4 rounded lg: py-2 mt-3"  onClick={()=>removefromcart(product)}>remove from Cart </button>
    )}
    else { 
     button=(<button className="bg-blue-600 text-white px-4 rounded lg: py-2 mt-3"  onClick={()=>addtocart(product)}>add to  cart </button>
)}
console.log("product card rendered");
    
    return (
    <div className="bg-white rounded-xl hover:shadow-xl " key={product.id}>

        <Link to={`/productdetail/${product.id}`}>  

          <img className="h-52 *:w-full object-containp-4" src={product.image} alt={product.title} />
           <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        </Link>  
           <p className="text-blue-600 font-bold mt-2 text-xl">{product.price}</p>
           <p className="text-gray-500 text-sm">{product.category}</p> 
           <p>{product.description.slice(0, 80)}...</p> 
           {button}
    </div>
    )
    
}
export default memo(ProductCard);
