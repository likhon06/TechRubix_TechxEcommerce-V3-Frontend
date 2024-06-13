"use client"
import { Container } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const TopCategoriesCard = () => {
    return (
        <>
            <h1 className='text-3xl text-center mt-10 font-bold mb-4 '>Top Categories</h1>
            <p className='text-md text-center mt-4 mb-4 w-3/4 mx-auto'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.</p>
            <Container>
                <div className="grid grid-rows-1 lg:grid-flow-col  gap-4 ">
                    <div className="row-span-12 col-span-12 md:row-span-6 md:col-span-6 lg:row-span-12 lg:col-span-4">
                        <div className=" relative isolate flex flex-col justify-end overflow-hidden h-full rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto">
                            
                            <Image width={1200} height={200}
                             src="https://images.pexels.com/photos/10701986/pexels-photo-10701986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="University of Southern California" 
                            className="absolute inset-0 h-full w-full object-cover" />

                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                            <h3 className="z-10 mt-3 text-3xl font-bold text-white">Lbel</h3>
                            <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">perfium</div>
                        </div>

                    </div>
                    <div className="row-span-12 col-span-12 md:row-span-6 md:col-span-6 lg:col-span-4 lg:row-span-6 ">
                        <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto">
                            <Image width={1200} height={200} src="https://images.pexels.com/photos/8523867/pexels-photo-8523867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                            <h3 className="z-10 mt-3 text-3xl font-bold text-white">Paris</h3>
                            <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">City of love</div>
                        </div>
                    </div>
                    <div className=" row-span-12 col-span-12 md:row-span-6 md:col-span-6 lg:row-span-6 lg:col-span-4 ">
                        <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto">
                            <Image width={1200} height={200} src="https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                            <h3 className="z-10 mt-3 text-3xl font-bold text-white">Paris</h3>
                            <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">City of love</div>
                        </div>
                    </div>
                    <div className="row-span-12 col-span-12 md:row-span-6 md:col-span-6 lg:col-span-4 lg:row-span-12">

                        <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto h-full">
                            <Image width={1200} height={200} src="https://images.pexels.com/photos/5970568/pexels-photo-5970568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                            <h3 className="z-10 mt-3 text-3xl font-bold text-white">Paris</h3>
                            <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">City of love</div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-10'>
                    <Link href={`/all-categories`} >
                        <button className=' btn rounded-3xl text-lg'>View All<MdOutlineKeyboardArrowRight className='size-6' /></button>
                    </Link>
                </div>
            </Container>
        </>
    )
}

export default TopCategoriesCard