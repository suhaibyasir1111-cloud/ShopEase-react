"use client"
import { useState } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import {Pencil,Trash2,Plus, Search,} from "lucide-react";

export default function ProductsTable({ productss }: { productss: any[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory]= useState("All");
  const router = useRouter();
  const [message , setmessage]= useState("");
  const [showModal, setShowModal] = useState(false);
const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredProducts = productss.filter((product) =>{
    const matchserch= product.title.toLowerCase().includes(search.toLowerCase());
    const matchcategory= category === "All" || product.category === category;
        return matchserch && matchcategory;
    })
    const categories = [
  "All",
  ...new Set(productss.map((product) => product.category))
];
const onDelete =  async (id:any)=>{

  try{
  const response = await fetch(`/api/products/${id}`,{
    method:"DELETE",
    headers:{
      "Content-type":"application/json",
    },
  });
  const result= await response.json();
  //console.log(result)
  if(!response.ok){
     setmessage(result.message || "Delete failed");
      return;
 //}
 // console.log(result);
 }
 router.refresh();
 setmessage(result.message);
 setShowModal(false)
 setSelectedId(null)
 router.refresh();
  } catch (error) {
    console.error(error);
    setmessage("Something went wrong");
  } 
}
const onImport = async () => {
  const response = await fetch("/api/products/import", {
    method: "POST",
  });

  const result = await response.json();

  if (!response.ok) {
    setmessage(result.error || "Import failed");
    return;
  }

  setmessage(result.message);
  router.refresh();
};
  return (
    
     <div >
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold">
        Products Management
      </h1>
      <Link href="/admin/products/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
       <Plus size={18}/> Add New Product
      </Link>
      <button onClick={onImport}
      className="bg-green-600 text-whit px-4 rounded-lg">
        Imorte pro
      </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
       <Search
      size={18}
     className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
   />

   <input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded-lg pl-10 pr-3 py-2 w-full"
   />
    </div>
    <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded-lg p-2">
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat=== "All" ? "All Categories" : cat}
        </option>
      ))}
    </select>
    </div>
      <table className="min-w-full ">
        
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Category</th>   
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Actions</th>         
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
          <tr key={product.id}>
            <td className="p-3">{product.title}</td>
            <td className="p-3">{product.category}</td>
            <td className="p-3">{product.price}</td>
            <td className="p-3">{product.stock===0? <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">Out of Stock </span>
            :product.stock<5?<span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-start">Low Stock</span>:<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">In Stock</span>}</td>
            <td className="p-3">
            <button onClick={() => router.push(`/admin/products/${product.id}/edit`)} title="Edit product" className="text-blue-600 hover:text-blue-800" ><Pencil size={18}/> </button>
            
            <button onClick={()=>{setSelectedId(product.id) 
              setShowModal(true)
            }}title="Delete product" className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {/* Delete Confirmation Modal */}
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">

      <h2 className="text-xl font-bold text-gray-800 mb-3">
        Delete Product?
      </h2>

      <p className="text-gray-600 mb-6">
        Are you sure you want to delete this product?
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">

        <button
          onClick={() => {
            setShowModal(false);
            setSelectedId(null);
          }}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            if (selectedId !== null) {
              onDelete(selectedId);
            }
          }}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Confirm Delete
        </button>

      </div>
    </div>
  </div>
)}

{/* Temporary Notification */}
{message && (
  <div className="fixed bottom-5 right-5 z-[60] bg-gray-900 text-white px-5 py-3 rounded-lg shadow-lg">
    {message}
    <button
      onClick={() => setmessage("")}
      className="ml-4 text-gray-300 hover:text-white"
    >
      ✕
    </button>
  </div>
)}
    </div>
  )}
