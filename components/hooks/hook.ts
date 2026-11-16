import { useEffect, useState } from "react";
import type { Product } from "../productcard";

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/products");
        const contentType = response.headers.get("content-type");
        if (!response.ok || !contentType?.includes("application/json")) {
          throw new Error(`Products API returned HTTP ${response.status}`);
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unable to load products"
        );
      } finally {
        setLoading(false);
      }
    }

    void getProducts();
  }, []);

  return {
    products,
    loading,
    error,
  };
}
/*function productlist(){
const [search , setsearch]=useState<([])>([])
{Products , Loading , error}=useProducts()

const filterpro = Cart.filter((item)=>
item.title toLowerCase().includes(search.tolowercase()))

<input
type = "text"
value = {search}
onchange{(e)=> setsearch (e.target.value)}

/>
return (
     <div> 
     
     
     </div>
)
}
*/
   
