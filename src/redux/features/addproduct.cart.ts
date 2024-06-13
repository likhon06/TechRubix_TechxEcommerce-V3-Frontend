import baseApi from "../BaseApi/BaseApi";

const addProductCartApi = baseApi.injectEndpoints({
    endpoints: (builder : any) => ({
        addProductCart: builder.query({
            query: (cartData : any) => ({
                url: `/cart`,
                method: 'POST',
                body: cartData,
            }),
            providesTags: ['products'],
        })
    })
})

export const { useAddProductCartMutation } = addProductCartApi;