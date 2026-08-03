import  {Link}  from "react-router-dom";
import { useCart } from "../context/CartContext";
function Navbar () {
    const {cart}=useCart();
    
    return (
        <nav className="bg-white shadow-md ">
    <div className="max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-6 px-4 mx-auto h-16">
        <h2 className="text-2xl font-bold text-blue-600 ">ShopEase</h2>
        <div className="flex items-center gap-6">
          <Link to= "/" className="text-gray-700 hover:text-blue-600 font-medium" >Home</Link>
           <Link to= "/cart" className="text-gray-700 hover:text-blue-600 font-medium" > Cart </Link>
           <h3 className="bg-blue-600 text-white w-7 h-7 flex items-center justify-center font-semibold">{cart.length}</h3> 
        </div>
    </div> 
    </nav>
    )

};
export default Navbar;