import baseApi from "../BaseApi/BaseApi";

const RegUserApi = baseApi.injectEndpoints({
    endpoints: (builder : any) => ({
        RegUserPost: builder.mutation({
            query: (userData : any) => ({
                url: '/api/auth/register',
                method: 'POST',
                body: userData
            })
        })
    })
})

export const { useRegUserPostMutation } = RegUserApi;