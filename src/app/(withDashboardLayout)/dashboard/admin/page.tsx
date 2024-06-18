"use client"

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [allUser, setAllUser] = useState([]);
  const [allProducts,setAllProducts] = useState(null);
  useEffect(()=>{
     const fetchAllUser = async() => {
        const res = await fetch('https://tech-rubix-backend.vercel.app/all-users',{
          next: {
            revalidate: 30
          }
        })
        const result = await res.json();
        console.log(result);
        setAllUser(result);
     }
     fetchAllUser();
  },[])

  useEffect(()=>{
    const fetchAllProducts = async() => {
       const res = await fetch('https://tech-rubix-backend.vercel.app/all-products',{
         next: {
           revalidate: 30
         }
       })
       const result = await res.json();
       setAllProducts(result.length);
    }
    fetchAllProducts();
 },[])
  return (
    <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-8">
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-green-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Users</h3>
          <p className="text-3xl">{allUser.length}</p>
        </div>
      </div>
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-red-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
            />
          </svg>
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Products in store</h3>
          <p className="text-3xl">{allProducts} (items)</p>
        </div>
      </div>
    </div>
  );
}