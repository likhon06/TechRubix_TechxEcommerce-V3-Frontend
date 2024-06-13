import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io';

const productsPage = async () => {
  const res = await fetch('http://localhost:5000/top-products', {
    next: {
      revalidate: 30
    }
  });
  const FlashDatas = await res.json();

  return (

    <div className='flex ps-20'>
      <div className='lg:w-3/5 '>
        <div className=' hidden lg:block'>
          <div className='w-3/5 mx-auto border border-gray-400 rounded-sm mt-12 p-4'>
            <span className='font-bold'>|</span>  Price Range <br />
            <div>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="$10 - $20" />
                <FormControlLabel control={<Checkbox />} label="$21 - $30" />
                <FormControlLabel control={<Checkbox />} label="$31 - $50" />
                <FormControlLabel control={<Checkbox />} label="$51 - $90" />
              </FormGroup>
            </div>
          </div>

          <div className='w-3/5 mx-auto border border-gray-400 rounded-sm mt-12 p-4'>
            <span className='font-bold'>|</span>  Categories <br />
            <div>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Food" />
                <FormControlLabel control={<Checkbox />} label="Drink" />
                <FormControlLabel control={<Checkbox />} label="Dairy" />
                <FormControlLabel control={<Checkbox />} label="Meat" />
              </FormGroup>
            </div>

          </div>

          <div className='w-3/5 mx-auto border border-gray-400 rounded-sm mt-12 p-4'>
            <span className='font-bold'>|</span>  Ratings <br />
            <div>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="1 Star" />
                <FormControlLabel control={<Checkbox />} label="2 Star" />
                <FormControlLabel control={<Checkbox />} label="3 Star" />
                <FormControlLabel control={<Checkbox />} label="4 Star" />
                <FormControlLabel control={<Checkbox />} label="5 Star" />
              </FormGroup>
            </div>
          </div>

        </div>
      </div>

      <div className='mt-11'>
        <div className='lg:hidden'>
          <Button variant='contained'>Drawer</Button>
        </div>

        <h1 className='text-3xl mt-4'>Our Collection Of Products</h1>
        <p>Showing {FlashDatas.length} item(s)</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div className="grid grid-cols-1 gy-4 md:grid-cols-2 lg:grid-cols-4 w-3/4">
          {
            FlashDatas.map((flashdata: any) => (
              <Link href={`/products/${flashdata._id}`} key={flashdata._id}>
                <div className='rounded-2xl m-4 p-4 transition-all duration-300 hover:scale-105 mt-10'
                >
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
              </Link>
            ))
          }
        </div>
      </div>


    </div>

  )
}

export default productsPage