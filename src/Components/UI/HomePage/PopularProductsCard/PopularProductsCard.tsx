import Image from 'next/image'
import React from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'

const PopularProductsCard = async ({ pdata }: { pdata: any }) => {

    return (
        <>
            <div className='rounded-2xl m-4 p-4 transition-all duration-300 hover:scale-105 mt-10'>
                <div style={{ overflow: 'hidden', height: '150px', borderRadius: '10px' }} className=' overflow-hidden relative'>
                    {
                        pdata?.discount && <span className='bg-gray-800 absolute text-gray-100 px-1.5 py-0.5 rounded-2xl top-2 left-2'>-{pdata?.discount}%</span>
                    }
                    <Image src={pdata.image}
                        width={1200}
                        height={200}
                        className='rounded-2xl'
                        alt="flashsaleimages" />
                </div>
                <div className="w-76 mt-4">
                    <div className='flex gap-4 items-center'>
                        <h1>{pdata.name}</h1> <h1 className='text-sm bg-green-400 text-green-700 px-2 rounded-xl font-bold'>{pdata.category}</h1>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2'>
                            <div>${pdata.regular_price}</div>
                        </div>
                        <button className='btn btn-xs mr-4 hover:cursor-pointer'>add to cart+</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopularProductsCard