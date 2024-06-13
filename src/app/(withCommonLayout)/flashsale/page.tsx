import { Pagination } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io';

const flashsale = async () => {
  const res = await fetch('http://localhost:5000/top-products', {
    next: {
      revalidate: 30
    }
  });
  const FlashDatas = await res.json();
  console.log(FlashDatas);

  return (

    <div className=''>
      <div className="grid grid-cols-1 gy-4 md:grid-cols-2 lg:grid-cols-4 w-3/4 mx-auto">
        {
          FlashDatas.filter((flashdata: any) => flashdata.flashsale === true).map((flashdata: any) => (
            <div key={flashdata._id} className='rounded-2xl m-4 p-4 transition-all duration-300 hover:scale-105 mt-10'>
              <div className=' overflow-hidden relative'>
                <span className='bg-gray-800 absolute text-gray-100 px-1.5 py-0.5 rounded-2xl top-2 left-2'>-13%</span>
                <Image src={flashdata.image}
                  width={1200}
                  height={200}
                  className='rounded-2xl'
                  alt="flashsaleimages" />
              </div>
              <div className="w-76 mt-4">
                <h1>{flashdata.title}</h1>
                <div className='flex justify-between items-center'>
                  <div className='flex gap-2'>
                    <div><s>${flashdata.prevPrice}</s></div>
                    <div>${flashdata.newPrice}</div>
                  </div>
                  <IoMdAddCircleOutline className='size-5 mr-4' />
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className='w-3/4 mx-auto'>
        <Pagination count={10} />
      </div>
    </div>
  )
}

export default flashsale