
"use client"
import { Container } from '@mui/material'
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io';
import { toast } from 'sonner';


const FlashSaleHomeCards =  ({ fdata }: { fdata: any }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('Token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decodedToken: {
          email: string;
        } = jwtDecode(storedToken);
        setUserEmail(decodedToken.email);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);
  const handleAddItemsToCart = () => {
    const EachItemData = {
      Email: userEmail,
      ProductId: fdata._id,
      ProductName: fdata.title,
      ProductPrice: fdata.newPrice,
    };
    fetch('http://localhost:5000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(EachItemData)
    })
      .then(response => response.json())
      .then(data => {
        if (data?.addedOne === true) {
          toast.success(`${fdata.title} added to your cart`);
        } else {
          toast.error(`Failed to add ${fdata.title} to your cart`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('An error occurred while adding the item to your cart');
      });
  }
  return (
    <Container>
      <div onClick={handleAddItemsToCart} className='rounded-2xl m-4 p-4 transition-all duration-300 hover:scale-105'>
        <div className='overflow-hidden relative'>
          <span className='bg-gray-800 absolute text-gray-100 px-1.5 py-0.5 rounded-2xl top-2 left-2'>-13%</span>
          <Image src={fdata.image}
            width={1200}
            height={200}
            className='rounded-2xl'
            alt="flashsaleimages" />
        </div>
        <div className="w-76 mt-4">
          <h1>{fdata.title}</h1>
          <div className='flex justify-between items-center'>
            <div className='flex gap-2'>
              <div><s>${fdata.prevPrice}</s></div>
              <div>${fdata.newPrice}</div>
            </div>
            <IoMdAddCircleOutline className='size-5 mr-4' />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default FlashSaleHomeCards