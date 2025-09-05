import React from 'react';
import Hero from '@/Components/UI/HomePage/Hero/Hero';
import TopCategoriesCard from '@/Components/UI/HomePage/TopCategoriesCard/TopCategoriesCard';
import ProductCard from '@/Components/UI/HomePage/ProductCard/ProductCard';
import PopularProduct from '@/Components/UI/HomePage/PopularProduct/PopularProduct';
import Marquee from "react-fast-marquee";
import Image from 'next/image';

const HomePage = async () => {
  const resOne = await fetch('https://tech-rubix-backend.vercel.app/flash-products', {
    next: {
      revalidate: 1
    }
  });
  const flashsaledata = await resOne.json();
  console.log(flashsaledata);

  const resTwo = await fetch('https://tech-rubix-backend.vercel.app/top-products', {
    next: {
      revalidate: 30
    }
  });
  const populardata = await resTwo.json();
  return (
    <>
      <Hero />
      {/* only take flash data from table */}
      <ProductCard flashsaledata={flashsaledata?.data} />
      <TopCategoriesCard />
      {/* all product top rated as popular product - higest 10 */}
      <PopularProduct populardata={populardata} />
      <div className='w-full mt-20'>
        <div className="w-3/4 mx-auto mb-8">
          <h1 className='font-bold text-3xl text-center mb-4'>Our Brands</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 p-6 w-full">
            <div className="flex items-center justify-center p-4">
                <Image 
                    className="object-contain hover:scale-105 transition-transform" 
                    src="https://upload.wikimedia.org/wikipedia/commons/d/de/AsusTek-black-logo.png" 
                    height={80} 
                    width={80} 
                    alt='Asus Logo'
                />
            </div>
            <div className="flex items-center justify-center p-4">
                <Image 
                    className="object-contain hover:scale-105 transition-transform" 
                    src="https://logos-world.net/wp-content/uploads/2020/05/Alienware-Logo.png" 
                    height={80} 
                    width={80} 
                    alt='Alienware Logo'
                />
            </div>
            <div className="flex items-center justify-center p-4">
                <Image 
                    className="object-contain hover:scale-105 transition-transform" 
                    src="https://forum.hardwareinside.de/media/asrock-logo-png.88870/full" 
                    height={80} 
                    width={80} 
                    alt='ASRock Logo'
                />
            </div>
            <div className="flex items-center justify-center p-4">
                <Image 
                    className="object-contain hover:scale-105 transition-transform" 
                    src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/msi-laptop-logo-icon.png" 
                    height={80} 
                    width={80} 
                    alt='MSI Logo'
                />
            </div>
            <div className="flex items-center justify-center p-4">
                <Image 
                    className="object-contain hover:scale-105 transition-transform" 
                    src="https://logos-world.net/wp-content/uploads/2023/01/AOC-Logo.png" 
                    height={80} 
                    width={80} 
                    alt='AOC Logo'
                />
            </div>
        </div>
      </div>
    </>

  );
}

export default HomePage; // Export Home as the default export