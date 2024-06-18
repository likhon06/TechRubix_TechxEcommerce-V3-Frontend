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
      <div className='w-1/2 mx-auto mt-20'>
        <h1 className='font-bold text-3xl text-center mb-4'>Our Brands</h1>
        <Marquee>
            <Image className='' layout='' src="https://upload.wikimedia.org/wikipedia/commons/d/de/AsusTek-black-logo.png" height={100} width={100} alt='' />
            <Image className='' src="https://logos-world.net/wp-content/uploads/2020/05/Alienware-Logo.png" height={100} width={100} alt='' />
            <Image className='' src="https://forum.hardwareinside.de/media/asrock-logo-png.88870/full" height={100} width={100} alt='' />
            <Image className='' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/ASUS_ROG_logo.svg/2491px-ASUS_ROG_logo.svg.png" height={100} width={100} alt='' />
            <Image className='' src="https://www.asus.com/media/Odin/Websites/US/News/sjvqt8fhzfcjxkfg/tuf_logo.png" height={100} width={100} alt='' />
            <Image className='' src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/msi-laptop-logo-icon.png" height={100} width={100} alt='' />
            <Image className=''  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ88IaFPKA25AWUcE4hW0NX4CU8zCUXSuOoXQ&s" height={100} width={100} alt='' />
            <Image className=''  src="https://logos-world.net/wp-content/uploads/2023/01/AOC-Logo.png" height={100} width={100} alt='' />
            <Image className=''  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXmJcjbKV_xUaIVTnAOa5j-8fSFRGxS5NRAQ&s" height={100} width={100} alt='' />
            <Image className=''  src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Logitech_logo.png" height={100} width={100} alt='' />
        </Marquee>
      </div>
    </>

  );
}

export default HomePage; // Export Home as the default export