import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Item } from "../../api/types";

type ItemsState = {
  pageSize: number;
  total: number;
  currentPage: number;
  sortBy: keyof Item;
  sortOrder: "ASC" | "DESC";
  searchQuery: string
};

export const ItemsSlice = createSlice({
  name: "Items",
  initialState: {
    pageSize: 50,
    currentPage: 1,
    sortBy: "name",
    sortOrder: "ASC",
    searchQuery: ''
  } as ItemsState,
  reducers: {
    changeConf(state, action: PayloadAction<Partial<ItemsState>>) {
        if(!action.payload.searchQuery) state.searchQuery = ''
        Object.assign(state, action.payload);
    },
  },
});

export const { changeConf } = ItemsSlice.actions
export default ItemsSlice.reducer