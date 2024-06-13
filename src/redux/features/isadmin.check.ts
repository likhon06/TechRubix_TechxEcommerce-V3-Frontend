import baseApi from "../BaseApi/BaseApi";

const isAdminCheckApi = baseApi.injectEndpoints({
    endpoints: (builder : any) => ({
        AdminCheck: builder.query({
            query: (userEmail : any) => ({
                url: `/user/${userEmail}`,
                method: 'GET',
            })
        })
    })
})

export const { useAdminCheckQuery } = isAdminCheckApi;