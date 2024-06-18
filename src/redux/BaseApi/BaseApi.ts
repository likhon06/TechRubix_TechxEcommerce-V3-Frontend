import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath : 'baseApi',
    baseQuery : fetchBaseQuery({baseUrl : 'https://tr-ecom-backend.vercel.app'}),
    tagTypes: ['products', 'user'],
    endpoints : () => ({})
})


export default baseApi;