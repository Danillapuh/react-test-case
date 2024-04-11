export function parseFormData<T>(data: FormData): T{
    const obj = {} as T
    data.forEach((val, key)=>{
        Object.assign(obj as FormData, {[key]: val})
    })
    return obj
}