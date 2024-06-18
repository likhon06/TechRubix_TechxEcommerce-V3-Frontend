
"use client"
import { Container } from '@mui/material'
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io';
import { toast } from 'sonner';


const FlashSaleHomeCards = ({ fdata }: { fdata: any }) => {
  console.log('fffff', fdata);
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
  return (
    <Container>
      <Link href={`/flashsale/${fdata._id}`}>
        <div className='rounded-2xl m-4 p-4 transition-all duration-300'>
          <div style={{ overflow: 'hidden', height: '150px', borderRadius: '10px' }} className=' overflow-hidden relative'>
            {
              fdata?.discount && <span className='bg-gray-800 absolute text-gray-100 px-1.5 py-0.5 rounded-2xl top-2 left-2'>-{fdata?.discount}%</span>
            }
            <Image src={fdata.image}
              width={1200}
              height={200}
              className='rounded-2xl'
              alt="flashsaleimages" />
          </div>
          <div className="w-76 mt-4">
            <div className='flex gap-4 items-center'>
              <h1>{fdata.name.slice(0, 20) + `...`}</h1> <h1 className='text-sm bg-green-400 text-green-700 px-2 rounded-xl font-bold'>{fdata.category}</h1>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex gap-2'>
                <div>${fdata.regular_price}</div>
              </div>
              <button className='btn btn-xs mr-4 hover:cursor-pointer'>add to cart+</button>
            </div>
          </div>
        </div>
        </Link>
    </Container>
  )
}

export default FlashSaleHomeCards