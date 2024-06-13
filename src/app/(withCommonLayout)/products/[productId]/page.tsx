import { Rating } from '@mui/material';
import Image from 'next/image';
import React from 'react'

const page = async ({ params }: { params: any }) => {

  const res = await fetch(`http://localhost:5000/products/${params.productId}`)
  const singleProduct = await res.json()
  console.log('ppppp',singleProduct)
  
  return (
          <div className="my-12">
            <div className="w-3/4 mx-auto">
              <div className="flex gap-12">
                  <Image
                       src={singleProduct.image}
                       width={400}
                       height={200}
                       alt="detailimage" className='rounded-2xl shadow-2xl' />
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-extrabold text-gray-900">{singleProduct?.title}</h2>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <p className="text-gray-900 text-4xl font-bold">${singleProduct?.newPrice}</p>
                    <p className="text-gray-700 text-xl"><s>${singleProduct.prevPrice}</s></p>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <h4 className="text-gray-700 text-base">Rating</h4>
                    <Rating name="half-rating-read" defaultValue={singleProduct.rating} precision={0.5} readOnly />
                  </div>
                  <div className="flex flex-wrap gap-4 mt-8">
                    <button type="button" className="min-w-[200px] transition-all duration-300 px-4 py-3 bg-green-400 hover:bg-green-500 text-black text-sm font-bold rounded">Buy now</button>
                    <button type="button" className="min-w-[200px] transition-all duration-300 px-4 py-3 bg-orange-400 hover:bg-orange-500 text-black text-sm font-bold rounded">Add to cart</button>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-300">About the coffee</h3>
                    <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-900">
                      <li>A cup of coffee is a beverage essential because of its timeless appeal</li>
                      <li>Easy to prepare. It can be brewed using various methods, from drip machines to manual pour-overs.</li>
                      <li>Available in various sizes, from a standard espresso shot to a large Americano, catering to different preferences.</li>
                      <li>You can customize your coffee by adding cream, sugar, or flavorings to suit your taste preferences.</li>
                      <li>You can customize your coffee by adding cream, sugar, or flavorings to suit your taste preferences.</li>
                      <li>You can customize your coffee by adding cream, sugar, or flavorings to suit your taste preferences.</li>
                      <li>You can customize your coffee by adding cream, sugar, or flavorings to suit your taste preferences.</li>
                    </ul>
                  </div>
                  <div className="mt-7">
                    <button type="button" className="w-full mt-8 px-4 py-2 bg-transparent border border-gray-300 text-gray-500 font-bold rounded">Read all reviews</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
  )
}

export default page