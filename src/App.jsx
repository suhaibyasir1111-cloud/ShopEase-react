import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <div>
      <BrowserRouter>
       <CartProvider>
      <Navbar/>
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/cart" element={<Cart />} />
           <Route path="/productdetail/:id" element={<ProductDetail />} />
        </Routes>
     </CartProvider>
     </BrowserRouter>
    </div>
  );
}

export default App;
