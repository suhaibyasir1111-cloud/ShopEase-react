
import { useCart } from "../context/CartContext";
import {Link} from "react-router-dom";



function ProductCard ({product,isCart}){ 
     console.log("productcard rendered",product.id)

    const {addtocart,removefromcart}=useCart();
    
    let button;
    if (isCart){
       button = (<button className="bg-blue-300 text-white px-4 rounded lg: py-2 mt-3"  onClick={()=>removefromcart(product)}>remove from Cart </button>
    )}
    else { 
     button=(<button className="bg-blue-300 text-white px-4 rounded lg: py-2 mt-3"  onClick={()=>addtocart(product)}>add to  cart </button>
)}
    
    return (
    <div className="border rounded-lg p-4 bg-slate-200 hover:shadow-xl  hover:scale-105" key={product.id}>

        <Link to={`/productdetail/${product.id}`}>  

          <img src={product.image} alt={product.title} className="w-full h-40 object-contain" />
           <h3 className="font-bold text-center text-black file: text-lg mt-3">{product.title}</h3>
        </Link>  
           <p className="text-blue-400 font-semibold mt-4">{product.price}</p>
           <p className="text-gray-200 text-sm">{product.category}</p> 
           <p>{product.description}</p> 
           {button}
    </div>
    )
    
}
export default ProductCard;
