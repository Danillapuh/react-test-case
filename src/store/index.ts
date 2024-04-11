import { configureStore } from "@reduxjs/toolkit";
import { Api, middleware } from "../api";
import ItemsReduser from './slices/itemsSlice'

export const store = configureStore({
    devTools: true,
    reducer: {
        [Api.reducerPath]: Api.reducer,
        'ItemsConf': ItemsReduser
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
})

export type StoreState = ReturnType<typeof store.getState> 