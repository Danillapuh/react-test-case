import { useDispatch, useSelector } from "react-redux"
import { Pages } from "../Pages/Index"
import { StoreState } from "../../store"
import { changeConf } from "../../store/slices/itemsSlice"
import { Item } from "../../api/types"

export const SortSettings = ()=>{
    const dispatch = useDispatch()
    const pagesInfo = useSelector((state: StoreState)=>state.ItemsConf)
    return <>
        <div className='flex gap-2'>

            <select className="bg-neutral-600 rounded-md p-1 text-white text-sm" onChange={(e)=>{
                const newVal = e.target.value as keyof Item
                dispatch(changeConf({sortBy: newVal, currentPage: 1}))
              }} defaultValue={pagesInfo.sortBy} name="" id="">
                <option value={'name'}>Название</option>
                <option value={'price'}>Цена</option>
              </select>

              <select className="bg-neutral-600 rounded-md p-1 text-white text-sm" onChange={(e)=>{
                const newVal = e.target.value as 'ASC' | 'DESC'
                dispatch(changeConf({sortOrder: newVal, currentPage: 1}))
              }} defaultValue={pagesInfo.sortOrder} name="" id="">
                <option value={'ASC'}>ASC</option>
                <option value={'DESC'}>DESC</option>
              </select>

              
            </div>
    </>
}