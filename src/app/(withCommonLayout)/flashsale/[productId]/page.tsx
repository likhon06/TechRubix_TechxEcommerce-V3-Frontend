"use client"
import { AddCart } from '@/Components/AddProductIntoCart/AddCart';
import { Rating } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'sonner';
interface JwtPayload {
  email: string
  role: string
}

const FlashSaleProductId = ({ params }: { params: any }) => {
  // Fetch on client side after mount to avoid async client component
  const [singleProduct, setSingleProduct] = useState<any>({});
  React.useEffect(() => {
    const load = async () => {
      const res = await fetch(`https://tech-rubix-backend.vercel.app/products/${params?.productId}`);
      const data = await res.json();
      setSingleProduct(data);
    };
    load();
  }, [params?.productId]);

  const handleItemAddIntoCart = async (id: any, name: any) => {
    const token = localStorage.getItem('Token');
    if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      const EmailSet = decodedToken?.email;
      const Role = decodedToken?.role;
      const datas = {
        email: EmailSet,
        product_id: id
      }

      if (Role !== 'admin') {
        const res = await AddCart(datas);
        if (res.result.acknowledged === true) {
          toast.success(`${name} added in your cart successfully`)
        } else {
          toast.error(`something went wrong!`);
        }
      }else{
        toast.error('You are Admin, You dont need to buy!');
      }
    } else {
      toast.success('something went wrong!')
    }
  }
  return (
    <div className="my-12">
      <div className="w-3/4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          <Image
            src={singleProduct.image}
            width={400}
            height={200}
            alt="detailimage" className='rounded-2xl shadow-2xl' />
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-gray-900">{singleProduct?.name}</h2>
            <div className="flex flex-wrap gap-4 mt-4">
              {
                singleProduct?.sale_price === 0 ? '' : <p className="text-gray-900 text-4xl font-bold">${singleProduct?.sale_price}</p>
              }
              {
                singleProduct?.sale_price === 0 ? <p className="text-gray-700 text-xl">${singleProduct.regular_price}</p> : <p className="text-gray-700 text-xl"><s>${singleProduct.regular_price}</s></p>
              }
            </div>
            <div className="flex space-x-2 mt-4">
              <h4 className="text-gray-700 text-base">Rating</h4>
              <Rating name="half-rating-read" defaultValue={singleProduct.rating} precision={0.5} readOnly />
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <button type="button" className="w-full lg:max-w-[200px] transition-all duration-300 px-4 py-3 bg-green-400 hover:bg-green-500 text-black text-sm font-bold rounded">Buy now</button>
              <button onClick={() => handleItemAddIntoCart(singleProduct?._id, singleProduct?.name)} type="button" className="w-full lg:max-w-[200px] transition-all duration-300 px-4 py-3 bg-orange-400 hover:bg-orange-500 text-black text-sm font-bold rounded">Add to cart</button>
            </div>
            <div className="mt-8">
              <h1>In stock: <span className='font-bold'>{singleProduct?.stock}</span> items</h1>
              <h3 className="text-lg font-bold text-gray-900 mt-5">About the {singleProduct?.category}</h3>
              <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-900">
                <p>{singleProduct?.description}</p>
              </ul>
            </div>
            <div className="mt-7">
              <Link href={`/products/${params?.productId}/reviews`} style={{

              }} className="mt-8 px-4 py-2 text-gray-100 bg-gray-900 font-bold rounded">Read all reviews</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlashSaleProductId