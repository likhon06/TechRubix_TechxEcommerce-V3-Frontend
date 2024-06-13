import baseApi from "../BaseApi/BaseApi";

const loginApi = baseApi.injectEndpoints({
    endpoints: (builder : any) => ({
        LoginPost: builder.mutation({
            query: (userData : any) => ({
                url: '/api/auth/login',
                method: 'POST',
                body: userData
            })
        })
    })
})

export const { useLoginPostMutation } = loginApi;