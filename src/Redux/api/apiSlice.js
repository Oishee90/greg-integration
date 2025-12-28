import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Try to get token from Redux state
    const token = getState().auth?.access_token || null;
    console.log(token);
    // If token not in state, retrieve from local storage
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else {
      const authData = JSON.parse(localStorage.getItem("auth"));
      if (authData?.access_token) {
        headers.set("authorization", `Bearer ${authData.access_token}`);
      }
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [
    "user",
    "Chats",
    "Policy",
    "Profile",
    "School",
    "Subscription",
    "Teacher",
    "Student",
    "Recommendation",
    "Lesson",
    "Observation",
  ],
  endpoints: () => ({}),
});
