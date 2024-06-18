"use server"
export const AddCart = async(data: any) => {
   console.log(data);
   try{
      const res = await fetch('http:localhost:5000/add/cart', {
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