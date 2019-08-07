import { ResolveFn, RejectFn } from "../types";

interface Interceptor<T>{
    resolve:ResolveFn<T>
    reject?:RejectFn
}

export default class InterceptorManager<T>{
    // 存储拦截器
    private interceptor:Array<Interceptor<T> | null>

    constructor(){
        this.interceptor = []
    }

    /**
     * 添加拦截器
     *
     * @param {ResolveFn<T>} resolve
     * @param {RejectFn} [reject]
     * @returns {number}
     * @memberof InterceptorManager
     */
    use(resolve:ResolveFn<T>,reject?:RejectFn):number{
        this.interceptor.push({
            resolve,reject
        })

        return this.interceptor.length -1
    }

    /**
     * 遍历拦截器
     *
     * @param {(interceptor:Interceptor<T>)=>void} fn
     * @memberof InterceptorManager
     */
    forEach(fn:(interceptor:Interceptor<T>)=>void):void{
        this.interceptor.forEach(i=>{
            if(i !== null){
                fn(i)
            }
        })
    }

    /**
     * 删除拦截器
     *
     * @param {number} id
     * @memberof InterceptorManager
     */
    eject(id:number):void{
        if(this.interceptor[id]){
            this.interceptor[id] = null
        }
    }

}