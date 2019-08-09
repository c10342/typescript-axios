import { AxiosTransform } from "../types";

// 处理 transformRequest transformRespond
export default function transform(data:any,headers:any,fns?:AxiosTransform|AxiosTransform[]):any{
    if(!fns){
        return
    }
    if(!Array.isArray(fns)){
        fns = [fns]
    }

    fns.forEach(fn=>{
        data = fn(data,headers)
    })

    return data
}