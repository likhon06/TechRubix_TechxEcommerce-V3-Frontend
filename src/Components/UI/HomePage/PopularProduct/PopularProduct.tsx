import PopularProductsCard from '@/Components/UI/HomePage/PopularProductsCard/PopularProductsCard';
import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link';
import React from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const PopularProduct = ({ populardata }: { populardata: any }) => {

    return (
        <>
            <div className="mt-[100px] w-3/4 mx-auto">
                <Box
                    display="flex"
                    justifyContent="space-between"
                >
                    <Typography variant='h4'
                        fontWeight={600}
                    >Most Popular Products <br />
                        <p
                            className='text-sm font-thin w-3/4'
                        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nunc in molestie feugiat. Nunc auctor consectetur elit, quis pulvina.</p>
                    </Typography>

                    <Link href={`/products`} >
                        <button className='btn rounded-3xl text-lg'>View All<MdOutlineKeyboardArrowRight className='size-6' /></button>
                    </Link>

                </Box>
                <div className="grid grid-cols-1 gy-4 md:grid-cols-2 lg:grid-cols-4">
                    {
                        populardata?.slice(0, 8).map((pdata: any) =>
                            <PopularProductsCard
                                key={pdata._id}
                                pdata={pdata}
                            />
                        )
                    }

                    {/* Add more ProductCard components as needed */}
                </div>
            </div>
        </>
    )
}

export default PopularProduct