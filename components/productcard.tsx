import Image from "next/image";
import AddToCartButton from "./addtocartbutton";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};1
export type cartitem = Product & {
  quantity: number;
}
export default function ProductCard({product}: { product: Product}) {

const imageSrc =
  product.image?.startsWith("https://fakestoreapi.com/")
    ? product.image
    : "/placeholder.svg";
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">

      <Image
        src={imageSrc}
        alt={product.title}
        width={200}
        height={200}
        className="mx-auto h-48 object-contain"
      />

      <h2 className="font-bold mt-4 line-clamp-2">
        {product.title}
      </h2>

      <p className="text-blue-600 font-bold mt-2">
        {product.price}
      </p>

      <AddToCartButton product={product}/>

    </div>
  );
}
