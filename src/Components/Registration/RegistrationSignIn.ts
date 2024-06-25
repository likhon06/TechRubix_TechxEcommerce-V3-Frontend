"use server"
import {cookies} from 'next/headers'
export const RegistrationSignIn = async(data: any) => {
   try{
      const res = await fetch('https://tech-rubix-backend.vercel.app/api/auth/register', {
         method: 'POST',
         headers: {
            'Content-Type' : 'application/json'
         },
        body: JSON.stringify(data),
      })
      const userPostResponse = await res.json();
      if(userPostResponse?.accessToken) {
        cookies().set('accessCookieToken', userPostResponse?.accessToken);
      }
      return userPostResponse;
   }catch(err) {
     console.log(err);
   }
}