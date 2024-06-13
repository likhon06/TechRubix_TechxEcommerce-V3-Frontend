import baseApi from "../BaseApi/BaseApi";

const productDeleteApi = baseApi.injectEndpoints({
    endpoints: (builder : any) => ({
        productDelete: builder.mutation({
            query: (userId : any) => ({
                url: `/top-products/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['products']
        })
    })
})

export const { useProductDeleteMutation } = productDeleteApi;