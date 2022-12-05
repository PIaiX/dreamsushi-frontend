import { createApi } from '@reduxjs/toolkit/query/react'
import { $authApi } from '..'
import { apiRoutes } from '../../config/api'

export const homeApi = createApi({
      reducerPath: 'homeApi',
      baseQuery: $authApi,
      refetchOnFocus: true,
      keepUnusedDataFor: 350,
      endpoints: (build) => ({
            getCategories: build.query({
                  query: () => apiRoutes.CATEGORY_ALL,
            }),
            getSales: build.query({
                  query: () => apiRoutes.SALES_GET,
            })
      }),
})

export const { useGetCategoriesQuery, useGetSalesQuery } = homeApi