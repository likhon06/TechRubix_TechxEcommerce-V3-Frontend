import React from 'react';
import Hero from '@/Components/UI/HomePage/Hero/Hero';
import TopCategoriesCard from '@/Components/UI/HomePage/TopCategoriesCard/TopCategoriesCard';
import ProductCard from '@/Components/UI/HomePage/ProductCard/ProductCard';
import PopularProduct from '@/Components/UI/HomePage/PopularProduct/PopularProduct';
import Marquee from "react-fast-marquee";
import Image from 'next/image';

const HomePage = async () => {
  const resOne = await fetch('http://localhost:5000/flash-products', {
    next: {
      revalidate: 1
    }
  });
  const flashsaledata = await resOne.json();
  console.log(flashsaledata);

  const resTwo = await fetch('http://localhost:5000/top-products', {
    next: {
      revalidate: 30
    }
  });
  const populardata = await resTwo.json();
  return (
    <>
      <Hero />
      {/* only take flash data from table */}
      <ProductCard flashsaledata={flashsaledata} />
      <TopCategoriesCard />
      {/* all product top rated as popular product - higest 10 */}
      <PopularProduct populardata={populardata} />
      <div className='w-3/4 mx-auto'>
        <Marquee>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/d/de/AsusTek-black-logo.png"   height={100} width={200} alt=''/>
                <Image src="https://logos-world.net/wp-content/uploads/2020/05/Alienware-Logo.png" height={100} width={200} alt=''/>
                <Image src="https://forum.hardwareinside.de/media/asrock-logo-png.88870/full" height={100} width={200} alt=''/>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/ASUS_ROG_logo.svg/2491px-ASUS_ROG_logo.svg.png" height={100} width={200} alt=''/>
                <Image src="https://www.asus.com/media/Odin/Websites/US/News/sjvqt8fhzfcjxkfg/tuf_logo.png" height={100} width={200} alt=''/>
        </Marquee>
      </div>
    </>

  );
}

export default HomePage; // Export Home as the default export