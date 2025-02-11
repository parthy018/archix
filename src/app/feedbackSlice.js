import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query";
import {baseUrl} from "./config";
export const feedbackApi=createApi({
    reducerPath:"feedbackApi",
    baseQuery:fetchBaseQuery({
        baseUrl:baseUrl,
        prepareHeaders:(headers,{getState})=>{
            const token = getState().app.token;
            if(token){
                headers.set("Authorization", `Bearer ${token}`);
            };
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
        endpoints: (builder) => ({
            submitReview: builder.mutation({
              query: (reviewData) => ({
                url: "/client/reviews",
                method: "POST",
                body: reviewData,
              }),
            }),
          }),
  
})

export const { useSubmitReviewMutation } = feedbackApi;
