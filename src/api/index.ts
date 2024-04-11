import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Item, ItemsResult } from './types'
import { changeConf } from '../store/slices/itemsSlice'
import { StoreState } from '../store'


const baseQuery = (data: FetchArgs | string, api: any, opt: any)=>fetchBaseQuery({ baseUrl: 'https://hcateringback-dev.unitbeandev.com/api/', headers: {
  Authorization: localStorage.getItem('token') || '',
  "Content-Type": 'application/json'
}})(data,api,opt)
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
  
    const refreshResult = await baseQuery({url:'/auth/login', headers: {}, method: 'POST', body:{
      login: 'admin',
      password: 'admin'
    }}, api, {})
    
    const data = refreshResult.data as {access_token: string}
    if (data) {
 
      localStorage.setItem('token', data.access_token)
      
      const a = typeof args == 'object' ? {...args, headers: {Aeae: 'a'}} : args
      result = await baseQuery(a, api, extraOptions)
      console.log(result)

      return result
    } 
  }
  return result
}

export const Api = createApi({
  tagTypes: ['ItemsPage'],
  baseQuery: baseQueryWithReauth,
  endpoints: (bild) => ({
    getItems: bild.query<ItemsResult, {page: number, pageSize: number, sortBy?: keyof Item, sortOrder?: 'ASC' | 'DESC'}>({
      providesTags: ['ItemsPage'],
      transformErrorResponse: ()=>'',
      query: ({page, pageSize, sortBy = 'name', sortOrder='ASC'})=> `/items?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }){
          /* const res = await queryFulfilled */
          /* if(res.data) dispatch(changeConf({total: res.data.total})) */
      }
    }),
    addItem: bild.mutation<Item, Partial<Item> & {name: string, measurement_units: string} >({
      query: (arg)=>({
        url: '/items',
        method: 'POST',
        body: arg
      }),
      invalidatesTags: ['ItemsPage']
    }),
    editItem: bild.mutation<Item, Partial<Item> & Pick<Item, 'id'> >({
      query: (arg)=>({
        url: `/items/${arg.id}`,
        method: 'PATCH',
        body: arg
      }),
      async onQueryStarted(arg, {queryFulfilled, getState, dispatch}){
          const state = getState() as StoreState
          const res = await queryFulfilled
          dispatch(
            Api.util.updateQueryData(
              "getItems",
              {
                page: state.ItemsConf.currentPage,
                pageSize: state.ItemsConf.pageSize,
                sortBy: state.ItemsConf.sortBy,
                sortOrder: state.ItemsConf.sortOrder
              },
              (draft) => {
                let item = draft.result.find((i) => i.id == res.data.id);
                if (item) Object.assign(item, res.data);
              }
            )
          );
      }
    })
  }),
})
export const { middleware, useGetItemsQuery, useAddItemMutation, useEditItemMutation} = Api