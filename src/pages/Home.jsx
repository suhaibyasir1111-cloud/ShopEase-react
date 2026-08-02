import { useState ,useEffect} from "react";
import getproduct from "../services/productservice";
import ProductCard from "../components/ProductCard";

function Home () {
const [data , setdata]= useState([]);
const [loading , setloading]= useState(true);
const [error , seterror ]=useState("");
const [search , setsearch ] = useState("");

useEffect(()=>{
const loadproduct = async ()=>{
try{
    setloading (true)
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
   
function handlesearch (e){
  setsearch(()=>(e.target.value))
}
const filterproduct = data.filter((item)=>{
  return item.title.toLowerCase() .includes(search)

})



        
    return( 
    <div className=" border rounded-md shadow-md p-2 transition duration-200 bg-slate-500 ">
        <div className="flex flex-row gap-7 p-2" > 
        <h3 className="bg-slate-100 text-orange-700">total products are : {data.length} </h3>
        <input type="text" 
        placeholder="Search" 
        value={search}
        onChange={handlesearch}
        className="text-center"/>
        </div>
        
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