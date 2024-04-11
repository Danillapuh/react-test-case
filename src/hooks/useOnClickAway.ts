import { RefObject, useEffect } from "react";

export function useOnClickAway (ref: RefObject<HTMLElement>, callback: Function | EventListener){
    useEffect(()=>{
        if(ref.current){
            const clickListener: EventListener = (e)=>{
                if(!ref.current!.contains(e.target as Node)) callback(e)
            }
        document.addEventListener('click', clickListener)
        return ()=>document.removeEventListener('click', clickListener)
        }
    },[])
}