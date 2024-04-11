import { DetailedHTMLProps, FormHTMLAttributes, useContext, useEffect, useRef } from "react"
import { parseFormData } from "../../helpers/parseFormData"
import { Item } from "../../api/types"
import Form from "../Form"
import { useAddItemMutation, useEditItemMutation } from "../../api"
import { DrawerContext } from "../Drawer"
import { IoClose } from "react-icons/io5"

export const ChangeItemForm: React.FC<{item: Item}> = ({item})=>{

    const [editItem, addInfo] = useEditItemMutation()
    const formRef = useRef<HTMLFormElement>(null)
    const {onClickAway} = useContext(DrawerContext)
    const onSubmit = (data:any)=>{
       
        editItem({...data, id: item.id}).unwrap().then(()=>{
            alert('изменен')
        })
    }
    return <Form ref={formRef} onSubmit={onSubmit} className="max-w-sm mx-auto p-3 flex flex-col h-full"> <div className="flex justify-end">
            <button onClick={()=>onClickAway()} className="text-neutral-600 hover:text-neutral-900">
                <IoClose size={20}/>
            </button>
        </div>
        <strong>{item.name}</strong>
    <div className="h-full">
        <div className="mt-3">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название</label>
            <input defaultValue={item?.name} name="name" required type="text" id="base-input" className="bg-gray-50 border border-gray-900 outline-none focus:border-opacity-25 border-opacity-15 text-gray-900 text-sm rounded-md block w-full p-2.5  "/>
        </div>
        <div className="mt-3">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Единицы измерения</label>
            <input defaultValue={item?.measurement_units} name="measurement_units" required type="text" id="base-input" className="bg-gray-50 border border-gray-900 outline-none focus:border-opacity-25 border-opacity-15 text-gray-900 text-sm rounded-md block w-full p-2.5  "/>
        </div>
        <div className="mt-3">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Артикул</label>
            <input defaultValue={item?.code} name="code" type="text" id="base-input" className="bg-gray-50 border border-gray-900 outline-none focus:border-opacity-25 border-opacity-15 text-gray-900 text-sm rounded-md block w-full p-2.5  "/>
        </div>
        <div className="mt-3">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание</label>
            <textarea defaultValue={item?.description} name="description" id="base-input" className="bg-gray-50 min-h-24 border border-gray-900 outline-none focus:border-opacity-25 border-opacity-15 text-gray-900 text-sm rounded-md block w-full p-2.5  "/>
        </div>
    </div>
    <div className="flex justify-center gap-3">
        <button type="button" onClick={()=>onClickAway()} className="px-6 py-2 w-full text-white bg-neutral-600 hover:bg-neutral-700 rounded-md">Отмена</button>
        <button disabled={addInfo.isLoading}  type="submit" className={`${addInfo.isLoading ? 'animate-pulse' : ''} px-6 py-2 w-full text-white bg-[#a85757] hover:brightness-90 rounded-md`}>Подтвердить</button>
    </div>
  </Form>
}