
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getproduct from "../services/productservice";

function ProductDetail() {
    const { id } = useParams();
    console.log(id);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
           
            try {
                setLoading(true);
                const datas = await getproduct();
                setData(datas);

            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, []);

    // Agla step yahan hoga
    const products = data.find(
        (item) => item.id === Number(id)
    );
    if (loading) {
        return <h2>Loading...</h2>;
    }

   if (!products) {
       return <h2>Product not found</h2>;
 }

    return (
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
            <img src={products.image} alt={products.title} className="w-full h-96 object-contain bg-white rounded-md shadow-md p-8"/>
            </div>
            <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-gray-900">{products.title}</h2>
            <p className="text-2xl font-bold text-blue-600">Price: ${products.price.toFixed(2)}</p>
            <p className="text-lg text-gray-500">Category: {products.category}</p>
            <p className="text-lg text-gray-600 mt-4">Description: {products.description}</p>
            </div>
        </div>
        
    );
}

export default ProductDetail;