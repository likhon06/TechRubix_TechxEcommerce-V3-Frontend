import React from 'react'

const ReviewPage = async({params} : {params : any}) => {
    const res = await fetch(`https://tech-rubix-backend.vercel.app/products/${params?.productId}/reviews`,{
        next : {
          revalidate:1
        }
    })
    const reviewsProduct = await res.json();
  return (
    <div className='mt-20 mb-20'>
             {
              reviewsProduct.length === undefined ? <h1 className='w-3/4 mx-auto font-bold'>Total Reviews 0</h1> :  <h1 className='w-3/4 mx-auto font-bold'>Total Reviews {reviewsProduct?.length}</h1>
             }
    </div>
  )
}

export default ReviewPage