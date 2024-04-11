import { ComponentProps, DetailedHTMLProps, FormHTMLAttributes, RefObject, forwardRef } from "react";
import { parseFormData } from "../../helpers/parseFormData";
import { Item } from "../../api/types";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
   onSubmit: (data: any)=>void
}

const Form: React.ForwardRefRenderFunction<HTMLFormElement, FormProps> = (props: FormProps, ref)=>{

    const submit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>)=>{
        e.preventDefault()
        let formdata = new FormData(e.currentTarget)
        let data = parseFormData<Item>(formdata)
        props.onSubmit(data)
    }


    return <form ref={ref} action="" {...props} onSubmit={submit}>
        {props.children}
    </form>
}
export default forwardRef(Form);