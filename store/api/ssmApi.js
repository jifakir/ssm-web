import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// const user = typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('user_details'));
const user = {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxNWEzNDBhLTI5MmYtNGU1MS04ZDBjLTMzOWZiNTExNTJiZiIsImZ1bGxfbmFtZSI6IkphaGlkdWwgSXNsYW0iLCJlbWFpbCI6ImdrLmphaGlkQGdtYWlsLmNvbSIsImlhdCI6MTY1MTI0MDU1MCwiZXhwIjoxNjUxMjQwNTgwfQ.Z3JbRHxA1WvNcIopNyBSj7jIlvrFXIQktDv3otfrIOI'}


export const ssmApi = createApi({
    reducerPath: "ssmApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
    }),
    tagTypes: ['SSM'],
    endpoints: (builder) => ({
        login: builder.query({
            query: () => '/auth/login',
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
            query: () => ({
                url: '/therapists/myaccount',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }),
            providesTags: ['SSM']
        }),
        registerTherapist: builder.mutation({
            query: (body) => ({
                url: '/therapists',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                body
            }),
            invalidatesTags: ['SSM']
        }),
        updateTherapist: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                body
            }),
            invalidatesTags: ['SSM']
        }),
    })
});


export const { useLoginQuery, useFetchTherapistQuery, useSignupMutation, useRegisterTherapistMutation, useUpdateTherapistMutation } = ssmApi;