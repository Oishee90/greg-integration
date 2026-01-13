import { apiSlice } from "../api/apiSlice";

export const authapi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    superAdminLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/login/",
        method: "POST",
        body: data,
      }),
    }),

    // all user
    getADashboardTotalUser: builder.query({
      query: () => "/admin-dashboard-total-user-and-active-user/",
    }),
    getActiveUsersGraph: builder.query({
      query: (year) => `/admin-dashboard/active-users-graph/?filter=${year}`,
    }),
    getAllUser: builder.query({
      query: () => "/admin-dashboard/users-list",
    }),
    suspendUser: builder.mutation({
      query: ({ user_id, reason }) => ({
        url: "/admin-dashboard/suspend-account/",
        method: "POST",
        body: { user_id, reason },
      }),
    }),
    activateUser: builder.mutation({
      query: (data) => ({
        url: "/admin-dashboard/reactivate-account/",
        method: "POST",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin-dashboard/delete-account/${id}/`,
        method: "DELETE",
      }),
    }),
    // feedback
       getAllFeedback: builder.query({
      query: () => "/feedback/admin/list/",
    }),
    // terms and privacy
    getTerms: builder.query({
      query: () => "/terms/",
    }),
     getPolicy: builder.query({
      query: () => "/privacy/",
    }),
    updateTerms: builder.mutation({
      query: ({ id, content }) => ({
        url: `/admin-terms-and-condition/${id}/`,
        method: "PATCH",
        body: {
          type: "terms",
          content: content,
        },
      }),
    }),
    updatePrivacy: builder.mutation({
      query: ({ id, content }) => ({
        url: `/admin-terms-and-condition/${id}/`,
        method: "PATCH",
        body: {
          type: "privacy",
          content: content,
        },
      }),
    }),

    // getSingleUser: builder.query({
    //   query: (id) => `/api/v1/view-user/${id}/`,
    // }),
    // quotes
    // createCategory: builder.mutation({
    //   query: (body) => ({
    //     url: "api/v1/create-category/",
    //     method: "POST",
    //     body,
    //   }),
    // }),
  }),
});

export const {
  useSuperAdminLoginMutation,
  useGetActiveUsersGraphQuery,
  useGetADashboardTotalUserQuery,
  useGetAllUserQuery,
  useSuspendUserMutation,
  useActivateUserMutation,
  useDeleteUserMutation,
  useGetTermsQuery,
  useUpdateTermsMutation,
  useUpdatePrivacyMutation,
  useGetPolicyQuery,
  useGetAllFeedbackQuery
} = authapi;
