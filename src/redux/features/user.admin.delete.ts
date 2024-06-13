import baseApi from "../BaseApi/BaseApi";
const deleteUserApi = baseApi.injectEndpoints({
    endpoints: (builder : any) => ({
        deleteUser: builder.mutation({
            query: (userId : any) => ({
                url: `/admin/user-delete/${userId}`,
                method: 'DELETE',
            }),
            providesTags: ['user'],
        })
    })
})

export const { useDeleteUserMutation } = deleteUserApi;