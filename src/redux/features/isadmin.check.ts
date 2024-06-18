import baseApi from "../BaseApi/BaseApi";

const isAdminCheckApi = baseApi.injectEndpoints({
    endpoints: (builder : any) => ({
        AdminCheck: builder.query({
            query: (userEmail : string) => ({
                url: `/user/${userEmail}`,
                method: 'GET',
            })
        })
    }),
    overrideExisting: false,
})

export const { useAdminCheckQuery } = isAdminCheckApi;