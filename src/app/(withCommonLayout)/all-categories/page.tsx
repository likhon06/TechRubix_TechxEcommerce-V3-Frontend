
import PopularProductsCard from '@/Components/UI/HomePage/PopularProductsCard/PopularProductsCard';
import React from 'react'

const allCategoryPage = async() => {
    const res = await fetch('https://tech-rubix-backend.vercel.app/top-products')
    const populardata = await res.json();
    return (
        <>
            <div className="mt-[100px] w-3/4 mx-auto">

                <div className="grid grid-cols-1 gy-4 md:grid-cols-2 lg:grid-cols-4">
                    {
                        populardata.map((pdata: any) =>
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

export default allCategoryPage