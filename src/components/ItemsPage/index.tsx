import { useSelector } from "react-redux"
import { useGetItemsQuery } from "../../api"
import { StoreState } from "../../store"
import { useEffect, useMemo, useRef } from "react";
import { Item } from "../Item";



export const ItemsPage = ()=>{
    const pageInfo = useSelector((state: StoreState)=>state.ItemsConf)

    const pageRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        pageRef.current!.scrollTop = 0
    },[pageInfo.currentPage])

    const { data, isFetching } = useGetItemsQuery({
      page: pageInfo.currentPage,
      pageSize: pageInfo.pageSize,
      sortBy: pageInfo.sortBy,
      sortOrder: pageInfo.sortOrder
    });

    return <>
        <div ref={pageRef}  className='h-full scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-200 overflow-y-auto'>
            {(!isFetching) ? data?.result.filter(item=>item.name.toLowerCase().includes(pageInfo.searchQuery.toLowerCase())).map(item=><Item key={item.id} item={item}/>) : 
            [1,1,1,1,1,1,1,1,1].map(a=><div className="h-1/6 bg-slate-200 animate-pulse rounded-md mt-2 flex items-center p-3">
                <div className="h-1/2 bg-slate-400 w-44 animate-pulse rounded-lg"></div>
            </div>)}
        </div>
    </>
}