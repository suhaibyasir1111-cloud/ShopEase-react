import { useCart } from "../context/CartContext";

function CartItem({ product }) {
  const { removefromcart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6 flex flex-col sm:flex-row items-center gap-6">

      <img
        src={product.image}
        alt={product.title}
        className="w-28 h-28 object-contain"
      />

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">
          {product.title}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {product.category}
        </p>

        <p className="text-xl font-bold text-blue-600 mt-3">
          ${product.price.toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => removefromcart(product)}
        className="bg-red-500 hover:bg-red-600 text-white w-full sm:auto rounded-lg transition"
      >
        Remove
      </button>

    </div>
  );
}

export default CartItem;