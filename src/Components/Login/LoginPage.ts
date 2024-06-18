"use server"
import {cookies} from 'next/headers'
export const LoginPage = async(data: any) => {
   try{
      const res = await fetch('https://tech-rubix-backend.vercel.app/api/auth/login', {
         method: 'POST',
         headers: {
            'Content-Type' : 'application/json'
         },
        body: JSON.stringify(data),
      })
      const userPostResponse = await res.json();
      if(userPostResponse?.token) {
        cookies().set('accessCookieToken', userPostResponse?.token);
      }
      return userPostResponse;
   }catch(err) {
     console.log(err);
   }
}