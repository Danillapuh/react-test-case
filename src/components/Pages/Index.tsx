import { useDispatch, useSelector } from "react-redux"
import { StoreState } from "../../store"
import { useMemo } from "react"
import { changeConf } from "../../store/slices/itemsSlice"
import { GrLinkNext } from "react-icons/gr";

export const Pages = ()=>{
    const conf = useSelector((state: StoreState)=>state.ItemsConf)
    const dispatch = useDispatch()

    const pages = useMemo(()=>{
        const pages: number[] = []
        for (let i = 1; i < Math.floor(conf.total / conf.pageSize); i++){
            pages.push(i)
        }
        return pages
    }, [conf])

    const pageIdx = pages.indexOf(conf.currentPage)

    function getPagesIdx(pagesCount: number, currentPageIdx: number): [number, number] {
        let indexL: number = currentPageIdx - Math.min(currentPageIdx, 2);
        let indexR: number = currentPageIdx + Math.min(pagesCount - currentPageIdx, 3);
        indexL = Math.max(indexL - Math.min(Math.abs(indexR - indexL - 5), currentPageIdx), 0);
        indexR = indexR + Math.min(Math.abs(indexR - indexL - 5), pagesCount - currentPageIdx);
        return [indexL, indexR];
    }

    const pagesToDisplay = useMemo(()=>pages.slice(...getPagesIdx(pages.length, pageIdx)), [conf.currentPage, conf.total])

    const changePage = (page: number)=>{
        if(pages.indexOf(page) > -1){
            dispatch(changeConf({currentPage: page}))
        }
    } 

    return <>
    {conf.total && <div className="flex gap-2 mt-2 p-1">
        <button onClick={()=>changePage(conf.currentPage - 1)} className="flex rotate-180 items-center justify-center w-10 h-10 rounded-md hover:bg-neutral-100 cursor-pointer">
            <GrLinkNext size={15} />
        </button>
        {pagesToDisplay.map(p=><button onClick={()=>changePage(p)} className={`${conf.currentPage == p ? 'ring-2 ring-red-400' : ''} flex items-center justify-center w-10 h-10 rounded-md hover:bg-neutral-100 cursor-pointer`}>
            {p}
        </button>)}
        <button onClick={()=>changePage(conf.currentPage + 1)} className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-neutral-100 cursor-pointer">
            <GrLinkNext size={15} />
        </button>
        </div>}
    </>
}