import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'

const PopularProductsCard = async ({ pdata }: { pdata: any }) => {

    return (
        <>
            <Link href={`/products/${pdata._id}`}>
                <div className='rounded-2xl m-4 p-4 transition-all duration-300 hover:scale-105 mt-10 hover:cursor-pointer'>
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
                            <h1>{pdata.name.slice(0,20)+`...`}</h1> <h1 className='text-sm bg-green-400 text-green-700 px-2 rounded-xl font-bold'>{pdata.category}</h1>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-2'>
                                <div>
                                    {
                                        pdata?.sale_price === 0 ? <h1>${pdata.regular_price}</h1> : <h1>${pdata.sale_price}</h1>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default PopularProductsCard