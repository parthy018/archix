import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://arch-backend-fgte.onrender.com/api"; // Backend base URL

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),

    }),
    getReview:builder.query({
      query:()=>({
        url:"/public/reviews",
        method:"GET"
    }),
    }),
    getAllProject:builder.query({
      query:()=>({
        url:"/public/projects",
      })
    }),
    getSliderImages:builder.query({
      query:()=>({
        url:"/public/slider",
      })
    }),
    requirements:builder.mutation({
      query: (payload)=>({
        url:"/guest/requirements",
        method:"POST",
        body:payload,
        headers:{ "Content-Type": "application/json" },
      })
    })
  }),

});

// Export hooks for usage in components
export const { useLoginMutation, useRegisterMutation , useGetReviewQuery,
  useGetAllProjectQuery,useGetSliderImagesQuery,useRequirementsMutation
} = authApi;
