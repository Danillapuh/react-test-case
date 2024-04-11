import { createContext, useRef } from "react"
import { useOnClickAway } from "../../hooks/useOnClickAway"
import { createPortal } from "react-dom"

type IModalProps = {children: JSX.Element | JSX.Element[], open?: boolean, onClickAway: Function}
type IContext = {onClickAway: Function}

export const ModalContext = createContext<IContext>({} as IContext)

export const Modal: React.FC<IModalProps> = ({children, open = false, onClickAway})=>{

    const drawerRef = useRef<HTMLDivElement>(null)

    useOnClickAway(drawerRef, (e)=>{
            onClickAway(e)
        
    })
    const onClose = ()=>{
        onClickAway()
    }

    return <>
    <ModalContext.Provider value={{onClickAway: onClose}}>
        {createPortal(<>
        <div className={`transition-opacity fixed top-0 left-0 bg-neutral-950 ${open ? 'opacity-70 w-full h-full' : 'opacity-0 w-0 h-0'} z-20`}></div>
        <div ref={drawerRef} className={`transition-all p-3 fixed flex justify-center rounded-lg overflow-hidden right-1/2 top-1/2 z-50 w-full md:w-fit ${open ? 'translate-x-1/2 -translate-y-1/2 opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
            {children}
        </div>
        </>, document.body)}
    </ModalContext.Provider>
    </>
}