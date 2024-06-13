import baseApi from "../BaseApi/BaseApi";
const makeAdminUserApi = baseApi.injectEndpoints({
    endpoints: (builder : any) => ({
        makeUserAdmin: builder.mutation({
            query: (userId : any) => ({
                url: `/admin/make-admin-edit/${userId}`,
                method: 'PATCH',
            }),
            providesTags: ['user'],
        })
    })
})

export const { useMakeUserAdminMutation } = makeAdminUserApi;