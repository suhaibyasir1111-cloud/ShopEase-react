import  {Link}  from "react-router-dom";
import { useCart } from "../context/CartContext";
function Navbar () {
    const {cart}=useCart();
    
    return (
    <div className="bg-sky-200 flex flex-row sm:flex-3 gap-4">
     
        <Link to= "/" >home</Link>
        <Link to= "/cart"> cart </Link>
       
        <h3 className="bg-yellow-50 w-6 text-center">{cart.length}</h3> 
    </div>
    )

};
export default Navbar;