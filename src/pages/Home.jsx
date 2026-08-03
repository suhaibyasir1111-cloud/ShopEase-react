import { useState ,useEffect} from "react";
import getproduct from "../services/productservice";
import ProductCard from "../components/ProductCard";
import {useMemo} from "react";
import { useCallback } from "react";
import SkeletonCard from "../components/Skeleton";

function Home () {
const [data , setdata]= useState([]);
const [loading , setloading]= useState(true);
const [error , seterror ]=useState("");
const [search , setsearch ] = useState("");

useEffect(()=>{
const loadproduct = async ()=>{
try{
    setloading (true)
    await new Promise((resolve) => setTimeout(resolve, 2000));
  const datas = await getproduct();
    setdata(datas);
}
catch {
 seterror("plese wait api is downloading product");
}
finally{
setloading(false);
}
}

loadproduct();
},[])
   
const handlesearch = useCallback((e) => {
  setsearch(e.target.value);
}, []);

const filterproduct =  useMemo(()=>{
  return data.filter((item)=>{
    return item.title.toLowerCase() .includes(search)
  })
},[data,search])

if (loading) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">

            {Array.from({ length: 8 }).map((_, index) => (

                <SkeletonCard key={index} />

            ))}

        </div>
    );
}
        
    return( 
    <div>
      <section className="max-w-7xl mx-auto px-6 py-16" >
        <h1 className="text-5xl font-bold text-gray-900 text-center">ShopEase</h1>
        <h2 className="text-xl text-gray-600 mt-4 text-center">Discover Amazing Products at best prices</h2>
        <p className="text-gray-500 mt-3 max-w-2xl max-auto text-center">shop fashion ,jewelry and more with an modern shopping experience </p>
        
      </section>
      <section className="mt-8 flex justify-center ">
        <input className ="w-full px-4 py-3 border-gray-300 rounded-lg shadow-sm focus:outline-none focus-ring-2 "
         type="text"
        placeholder="Search for products..." 
        value={search}
        onChange={handlesearch}
        className="text-center"/>
        </section>
        <h3 className="text-lg font-semibold text-gray-700 mt-4">total products are : {data.length} </h3>
       
        
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-4 gap-7 ">
          { filterproduct.map((item)=>(
         <ProductCard 
         key={item.id}
         product={item}
         isCart={false}

        />
        ))}
     </div>
        
          
    </div>
        )
}
export default Home;