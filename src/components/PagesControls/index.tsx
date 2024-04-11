import { useDispatch, useSelector } from "react-redux"
import { Pages } from "../Pages/Index"
import { StoreState } from "../../store"
import { changeConf } from "../../store/slices/itemsSlice"

export const PagesControls = ()=>{
    const dispatch = useDispatch()
    const pagesInfo = useSelector((state: StoreState)=>state.ItemsConf)
    return <>
        <div className='flex justify-between px-3 py-1 items-center'>
            <Pages/>
            <div className="flex gap-2">
              <span className="text-neutral-700">Показывать по: </span>
              <select className="bg-neutral-600 rounded-md p-1 text-white" onChange={(e)=>{
                const newVal = parseInt(e.target.value)
                dispatch(changeConf({pageSize: newVal, currentPage: 1}))
              }} defaultValue={pagesInfo.pageSize} name="" id="">
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
    </>
}