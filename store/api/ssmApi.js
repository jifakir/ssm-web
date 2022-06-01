import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// const user = typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('user_details'));
const user = {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxNWEzNDBhLTI5MmYtNGU1MS04ZDBjLTMzOWZiNTExNTJiZiIsImZ1bGxfbmFtZSI6IkphaGlkdWwgSXNsYW0iLCJlbWFpbCI6ImdrLmphaGlkQGdtYWlsLmNvbSIsImlhdCI6MTY1MTI0MDU1MCwiZXhwIjoxNjUxMjQwNTgwfQ.Z3JbRHxA1WvNcIopNyBSj7jIlvrFXIQktDv3otfrIOI'}


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
    tagTypes: ['Therapist', 'SSM'],
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
                url: `/therapist/${body.id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Therapist']
        }),
    })
});


export const { useLoginMutation, useFetchTherapistQuery, useSignupMutation, useRegisterTherapistMutation, useUpdateTherapistMutation } = ssmApi;