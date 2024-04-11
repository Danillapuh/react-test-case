import { useDispatch, useSelector } from "react-redux"
import { StoreState } from "../../store"
import { IoMdSearch } from "react-icons/io";
import { useRef, useState } from "react";
import { Drawer } from "../Drawer";
import { AddItemForm } from "../AddItemForm";
import { changeConf } from "../../store/slices/itemsSlice";

export const HeaderControls = ()=>{
    const pagesInfp = useSelector((state: StoreState)=>state.ItemsConf)
    const dispatch = useDispatch()
    const searchRef = useRef<HTMLInputElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const onSearch = (e: React.SyntheticEvent)=>{
        const query = searchRef.current?.value.trim()
         dispatch(changeConf({searchQuery: query || ''}))
    }

    return <div className="flex flex-col items-start gap-2 md:flex-row justify-between md:items-center my-2">
            <div className="flex md:flex-row items-center gap-2">
                <h4 className="text-2xl font-bold">Номенклатура</h4>
                <span className="p-1 rounded-md bg-orange-500 text-xs font-semibold text-white">{pagesInfp.total}</span>
            </div>
            <div className="flex gap-3 h-10">
                <div className="ring-1 ring-black ring-opacity-10 rounded-md overflow-hidden flex items-center pl-1 h-full">
                    <div className="text-neutral-500">
                        <IoMdSearch size={20}/>
                    </div>
                    <input ref={searchRef} type="text" placeholder="Поиск по названию" className="h-full min-w-16 px-2 py-1 shadow-sm outline-none"/>
                    <button onClick={onSearch} className=" bg-neutral-500 transition-all hover:bg-neutral-600 h-full px-3 py-1 text-white">
                        Поиск
                    </button>
                </div>
                <button onClick={(e)=>{
                    e.stopPropagation()
                    setIsOpen(true)
                }} className="bg-[#a85757] hover:brightness-90 transition-all rounded-md h-full px-3 py-1 text-white">
                    Новая позиция
                 </button>
            </div>
            <Drawer open={isOpen} onClickAway={()=>setIsOpen(false)}>
                <AddItemForm />
            </Drawer>
        </div>

}