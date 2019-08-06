import { AxiosResponse, AxiosRequestConfig } from "../types";

class AxiosError extends Error{
    isAxiosError:boolean
    code?:string|null
    request?:any
    response?:AxiosResponse
    config:AxiosRequestConfig

    constructor(message:string,config:AxiosRequestConfig,code?:string|null,request?:any,response?:AxiosResponse,){
        super(message)

        this.code = code
        this.request = request
        this.response = response
        this.config = config
        this.isAxiosError = true

        // 这里是因为typescript在继承原生内置对象时可能会访问不到对象的方法
        Object.setPrototypeOf(this,AxiosError.prototype)
    }
}

export function createError(message:string,config:AxiosRequestConfig,code?:string|null,request?:any,response?:AxiosResponse,){
    const error = new AxiosError(message,config,code,request,response)

    return error
}