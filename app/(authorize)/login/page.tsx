"use client";

import { useEffect, useState  } from "react";
import  { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "../../lib/schemas/login";
import { useRouter } from "next/navigation";


export default function LoginPage() {
const [message, setMessage] = useState("");
 
  const { register, handleSubmit, setFocus, formState: { errors, isSubmitting } } = useForm<LoginInput>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});

  const router = useRouter();
  
  /*const inputEmailRef = useRef<HTMLInputElement>(null);
   useEffect (()=>{
    inputEmailRef.current?.focus()

  },[]);*/
  useEffect(() => {
    setFocus("email");
 }, [setFocus]);
  
  async function handleLogin(logindata : LoginInput) {
   setMessage("");
    try{
   const response = await fetch("/api/login",{

      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(logindata),

   });
   
   const data = await response.json();
   console.log("Login response:",data);
   if(!response.ok){
    setMessage(data.message ?? "Login failed");
    return;
   }
   setMessage(data.message ?? "login successful");
   router.push("/productss");
   router.refresh();
  } catch (error) {
    console.error("login error:",error);
    setMessage("server se connect nho ho ska");
  }
 
}
async function handleLogout() {
  const response = await fetch("/api/logout", {
    method: "POST",
  });

  const data = await response.json();

  console.log(data);
}
async function getProfile() {
  const response = await fetch("/api/profile");

  const data = await response.json();

  console.log(data);
}
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(handleLogin)} className="bg-white p-8 rounded-lg shadow-lg w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login 
        </h1>

        <input
          type="email"
          {...register("email")}
          className="w-full border p-3 rounded mb-4"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
         type="password"
          {...register("password")}
          placeholder="Enter Password"
          className="w-full border p-3 rounded mb-6"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3  hover:bg-blue-700 transition hover:scale-110"
        >
          {isSubmitting ? "logging in ...":"login"}
        </button> 
        {message &&(
          <p 
          role="status"
          className="mt-4 rounded bg-yellow-200 p-3  text-sm text-black"> {message}</p>
        )}
        
        <button onClick={handleLogout} type="button"
          
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-amber-700 animate-pulse">
         Logout
        </button>
        <button onClick={getProfile} type="button">
         Get Profile
         </button>

      </form>
    </main>
  );
}
