import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const ssmApi = createApi({
    reducerPath: "ssmApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userDetails.token
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
              headers.set('authorization', `Bearer ${token}`)
            }
        
            return headers
          },
    }),
    tagTypes: ['Therapist', 'SSM', 'Patient', 'Subscription', 'Card'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body
            }),
            providesTags: ['SSM']
        }),
        googleLogin: builder.mutation({
            query: (body) => ({
                url: '/auth/google',
                method: 'POST',
                body
            }),
            providesTags: ['SSM']
        }),
        signup: builder.mutation({
            query: (body) => ({
                url: '/auth/signup',
                method: 'POST',
                body
            }),
            invalidatesTags: ['SSM']
        }),
        fetchTherapist: builder.query({
            query: () => '/therapists/my-account',
            providesTags: ['Therapist']
        }),
        fetchPatient: builder.query({
            query: () => '/patients/my-account',
            providesTags: ['Patient']
        }),
        registerTherapist: builder.mutation({
            query: (body) => ({
                url: '/therapists',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Therapist']
        }),
        updateTherapist: builder.mutation({
            query: (body) => ({
                url: `/therapists/${body.id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Therapist']
        }),
        uploadLicense: builder.mutation({
            query: ({id, formData}) => ({
                url: `/therapists/${id}/upload-license`,
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Therapist']
        }),
        uploadPicture: builder.mutation({
            query: ({id, formData}) => ({
                url: `/therapists/${id}/upload-picture`,
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Therapist']
        }),
        registerPatient: builder.mutation({
            query: (body) => ({
                url: '/patients',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Patient']
        }),
        updatePatient: builder.mutation({
            query: (body) => ({
                url: `/patients/${body.id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Patient']
        }),
        // Subscription
        fetchSubscriptionPlan: builder.query({
            query: () => `/subscription-plans`
        }),
        subscribe: builder.mutation({
            query: (body) => ({
                url: `/subscriptions`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Subscription']
        }),
        fetchSubscriptions: builder.query({
            query: () => `/subscriptions`,
            providesTags: ['Subscription']
        }),
        fetchSubscriptionStatus: builder.query({
            query: () => `/therapists/subscription-status`,
            providesTags: ['Subscription']
        }),
        cancelSubscription: builder.mutation({
            query: ({ therapistId }) => ({
                url: `/subscriptions/${therapistId}/cancel`,
                method: 'POST',
            }),
            invalidatesTags: ['Subscription', 'Card']
        }),
        // Save card details
        saveCard: builder.mutation({
            query: (body) => ({
                url: '/therapists/save-payment-method',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Card'],
        }),
        changeDefaultCard: builder.mutation({
            query: ({paymentMethod, therapistId}) => ({
                url: `/therapists/${therapistId}/make-payment-method-default`,
                method: 'POST',
                body: {
                    payment_method_id: paymentMethod
                }
            }),
            invalidatesTags: ['Card']
        }),
        matchTherapist: builder.query({
            query: ({ patientId }) => `/patients/${patientId}/get-matches`
        }),
        fetchCardList: builder.query({
            query: ({ therapistId }) => `/therapists/${therapistId}/payment-methods`,
            providesTags: ['Subscription', 'Card']
        }),
        
    })
});


export const { 
    useLoginMutation, 
    useGoogleLoginMutation, 
    useFetchTherapistQuery,
    useFetchPatientQuery,
    useSignupMutation, 
    useRegisterTherapistMutation, 
    useUpdateTherapistMutation,
    useRegisterPatientMutation,
    useUpdatePatientMutation,
    useUploadLicenseMutation,
    useFetchSubscriptionPlanQuery,
    useSubscribeMutation,
    useFetchSubscriptionsQuery,
    useUploadPictureMutation,
    useSaveCardMutation,
    useMatchTherapistQuery,
    useCancelSubscriptionMutation,
    useFetchCardListQuery,
    useFetchSubscriptionStatusQuery } = ssmApi;
