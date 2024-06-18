"use server"
export const AddCart = async(data: any) => {
   console.log(data);
   try{
      const res = await fetch('https://tech-rubix-backend.vercel.app/add/cart', {
         method: 'POST',
         headers: {
            'Content-Type' : 'application/json'
         },
        body: JSON.stringify(data),
      })
      const cartPostResponse = await res.json();
      console.log(cartPostResponse);
      return cartPostResponse;
   }catch(err) {
     console.log(err);
   }
}