import { DetailedHTMLProps, FormHTMLAttributes, useContext, useEffect, useRef } from "react"
import { IoClose } from "react-icons/io5";
import Form from "../Form"
import { useAddItemMutation } from "../../api"
import { DrawerContext } from "../Drawer"

export const AddItemForm = (props: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>)=>{

    const [addItem, addInfo] = useAddItemMutation()
    const formRef = useRef<HTMLFormElement>(null)
    const {onClickAway} = useContext(DrawerContext)

    const onSubmit = (data:any)=>{
       
        addItem(data).unwrap().then(res=>{
            formRef.current?.reset()
            alert('добавлен')
        })
    }
    return <Form ref={formRef} onSubmit={onSubmit} {...props} className="max-w-sm mx-auto p-3 flex flex-col h-full">
    <div>
        <div className="flex justify-end">
            <button onClick={()=>onClickAway()} className="text-neutral-600 hover:text-neutral-900">
                <IoClose size={20}/>
            </button>
        </div>
        <div>
            <strong>Новая позиция</strong>
            <br/>
            <span className="text-sm text-neutral-500">Заполните все поля для создания новой номенклатуры</span>
        </div>
    </div>
    <div className="h-full">
        <div className="mt-3">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название</label>
            <input name="name" required type="text" id="base-input" className="bg-gray-50 border border-gray-900 outline-none focus:border-opacity-25 border-opacity-15 text-gray-900 text-sm rounded-md block w-full p-2.5  "/>
        </div>
        <div className="mt-3">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Единицы измерения</label>
            <input name="measurement_units" required type="text" id="base-input" className="bg-gray-50 border border-gray-900 outline-none focus:border-opacity-25 border-opacity-15 text-gray-900 text-sm rounded-md block w-full p-2.5  "/>
        </div>
        <div className="mt-3">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Артикул</label>
            <input name="code" type="text" id="base-input" className="bg-gray-50 border border-gray-900 outline-none focus:border-opacity-25 border-opacity-15 text-gray-900 text-sm rounded-md block w-full p-2.5  "/>
        </div>
        <div className="mt-3">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание</label>
            <textarea name="description" id="base-input" className="bg-gray-50 min-h-24 border border-gray-900 outline-none focus:border-opacity-25 border-opacity-15 text-gray-900 text-sm rounded-md block w-full p-2.5  "/>
        </div>
    </div>
    <div className="flex justify-center gap-3">
        <button onClick={()=>onClickAway()} className="px-6 rounded-md py-2 w-full text-white bg-neutral-600 hover:bg-neutral-700">Отмена</button>
        <button disabled={addInfo.isLoading}  type="submit" className={`${addInfo.isLoading ? 'animate-pulse' : ''} px-6 py-2 w-full rounded-md text-white bg-[#a85757] hover:brightness-90`}>Подтвердить</button>
    </div>
  </Form>
}