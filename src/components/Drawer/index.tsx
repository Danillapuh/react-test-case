import { createContext, useMemo, useRef } from "react"
import { useOnClickAway } from "../../hooks/useOnClickAway"

type IDraweProps = {children: JSX.Element | JSX.Element[], open?: boolean, onClickAway: Function}
type IContext = {onClickAway: Function}

export const DrawerContext = createContext<IContext>({} as IContext)

export const Drawer: React.FC<IDraweProps> = ({children, open = false, onClickAway})=>{

    const drawerRef = useRef<HTMLDivElement>(null)

    /* useOnClickAway(drawerRef, (e)=>{
            onClickAway(e)
        
    }) */
    const onClose = ()=>{
        onClickAway()
    }

    const childrens = useMemo(()=>children,[])

    const context = useMemo(()=>({onClickAway: onClose}),[])

    return <>
    <DrawerContext.Provider value={context}>
        <div onClick={()=>onClickAway()} className={`transition-opacity fixed top-0 left-0 bg-neutral-950 ${open ? 'opacity-60 w-full h-full' : 'opacity-0 w-0 h-0'} z-20`}></div>
        <div ref={drawerRef} className={`transition-all fixed h-full w-9/12 md:w-4/12 max-w-xs overflow-hidden bg-white right-0 top-0 z-50 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
            {childrens}
        </div>
    </DrawerContext.Provider>
    </>
}