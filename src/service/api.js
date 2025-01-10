import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://json-api.uz/api/project/fn1-fullstack",
      credentials: "include", 
      mode: "cors", 
    }),
    endpoints: (builder) => ({
      getArticles: builder.query({
        query: () => "articles/", 
      }),
      getOneArticle: builder.query({
        query: (id) => `article/${id}`, 
      }),
    }),
  });