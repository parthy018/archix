import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./config";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().app.token;
      console.log("Token", token);
      if (token) {
        headers.set("x-auth-token", token); // Use x-auth-token instead of Authorization
      }
      console.log("Headers", headers);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    submitReview: builder.mutation({
      query: (reviewData) => ({
        url: "/client/reviews",
        method: "POST",
        body: reviewData,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    createProject: builder.mutation({
      query: (payload) => ({
        url: "/admin/projects",
        method: "POST",
        body: payload,
      }),
    }),
    updateProject:builder.mutation({
      query:({projectID,payload})=>({
        url:`/admin/projects/${projectID}`,
        method:'PUT',
        body:payload,
      })
    }),
    sliderImages: builder.mutation({
      query: (payload) => ({
        url: "/admin/slider",
        method: "POST",
        body: payload,
      }),
    }),
    getAdminReviews:builder.query({
      query:()=>({
        url:"/admin/reviews",
      })
    }),
    deleteSliderImages:builder.mutation({
      query:(ids)=>({
        url:'/admin/slider',
        method:'DELETE',
        body:{ids},
      })
    }),
    selectHomeReviews:builder.mutation({
      query:(reviewIds)=>({
        url:'/admin/reviews/select',
        method:'PUT',
        body:{reviewIds},
      })
    }),


  }),
});

export const { useSubmitReviewMutation , useCreateProjectMutation,useSelectHomeReviewsMutation,
   useSliderImagesMutation, useGetAdminReviewsQuery,useDeleteSliderImagesMutation,
  useUpdateProjectMutation} = feedbackApi;