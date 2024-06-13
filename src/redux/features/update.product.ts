import baseApi from "../BaseApi/BaseApi";

const updateProductApi = baseApi.injectEndpoints({
    endpoints: (builder : any) => ({
        updateProduct: builder.mutation({
            query: (productId : any) => ({
                url: `/update-product/${productId}`,
                method: 'PUT',
            }),
            providesTags: ['products'],
        })
    })
})

export const { useUpdateProductMutation } = updateProductApi;