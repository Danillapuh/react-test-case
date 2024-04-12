import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Item, ItemsResult } from './types'
import { changeConf } from '../store/slices/itemsSlice'
import { StoreState } from '../store'


let _tokenPromise: Promise<string> | undefined

const baseQuery = fetchBaseQuery({ baseUrl: 'https://hcateringback-dev.unitbeandev.com/api/', prepareHeaders(headers, api) {
  if(localStorage.getItem('token')?.trim())
    headers.set('Authorization', localStorage.getItem('token')!)
  headers.set('Content-Type', 'application/json')
    
},})
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {

    if(_tokenPromise) await _tokenPromise
    else _tokenPromise = new Promise(async (res, rej)=>{
      const refreshResult = await baseQuery({url:'/auth/login', headers: {}, method: 'POST', body:{
        login: 'admin',
        password: 'admin'
      }}, api, {})
      
      const data = refreshResult.data as {access_token: string}
   
      localStorage.setItem('token', data.access_token)
      res(data.access_token)
    })
    await _tokenPromise
      
    result = await baseQuery(args, api, extraOptions)

    _tokenPromise = undefined
    return result
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
          const res = await queryFulfilled 
          if(res.data) dispatch(changeConf({total: res.data.total}))
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