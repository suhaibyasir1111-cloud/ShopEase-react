
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
        <div>
            <img src={products.image} alt={products.title} />
            <h2>{products.title}</h2>
            <p>Price: ${products.price.toFixed(2)}</p>
            <p>Category: {products.category}</p>
            <p>Description: {products.description}</p>
        </div>
    );
}

export default ProductDetail;