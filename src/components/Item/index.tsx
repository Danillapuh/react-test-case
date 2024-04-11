import { useState } from "react"
import { Item as ItemType } from "../../api/types"
import { FaPencil } from "react-icons/fa6"
import { Drawer } from "../Drawer"
import { ChangeItemForm } from "../ChangeItemForm"

export const Item: React.FC<{item: ItemType}> = ({item})=>{

    const [open, setOpen] = useState(false)

    const onOpen = (e: React.SyntheticEvent<HTMLButtonElement, MouseEvent>)=>{
        e.stopPropagation()
        setOpen(true)
        
    }

    return <div style={{minHeight: '16%'}}  className='grid overflow-hidden items-center grid-cols-4 gap-10 p-2 border-b-2 border-neutral-100'>
    <div className="flex items-center">{item.name}</div>
    <div>{item.measurement_units}</div>
    <div>{item.code}</div>
    <div className="flex justify-end p-3">
        <button onClick={(e)=>onOpen(e)} className="text-neutral-600 hover:text-neutral-900 transition-all">
            <FaPencil size={18}/>
        </button>
    </div>
        <Drawer open={open} onClickAway={()=>setOpen(false)}>
            <ChangeItemForm item={item}/>
        </Drawer>
  </div>
}