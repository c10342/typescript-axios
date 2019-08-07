
import { AxiosRequestConfig, AxiosResponse, AxiosPromise, Method, ResolveFn, RejectFn } from './../types/index';
import dispatchRequest from './dispatchRequest';
import InterceptorManager from './interceptorManager';
import mergeConfig from './mergeConfig';

// 拦截器
interface Interceptors {
    request: InterceptorManager<AxiosRequestConfig>
    respond: InterceptorManager<AxiosResponse>
}

// 链式调用数组
interface PromiseChain<T> {
    resolve: ResolveFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
    reject?: RejectFn
}

export default class Axios {
    // 拦截器
    interceptors: Interceptors
    // 配置
    defaults:AxiosRequestConfig
    constructor(defaults:AxiosRequestConfig) {
        // 初始化拦截器
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            respond: new InterceptorManager<AxiosResponse>()
        }
        // 初始化配置
        this.defaults = defaults
    }

    // 函数重载
    // request('/abc',{...})
    // request({...})
    request(url: any, config?: any): AxiosPromise {
        if (typeof url === 'string') {
            if (!config) {
                config = {}
            }
            config.url = url
        } else {
            config = url
        }
        config = mergeConfig(this.defaults,config)

        // 定义一个数组,方便实现链式调用
        const chain: PromiseChain<any>[] = [
            {
                resolve: dispatchRequest,
                reject: undefined
            }
        ]

        // request后添加的先执行
        this.interceptors.request.forEach(interceptor => {
            chain.unshift(interceptor)
        })
        // respond先添加的先执行
        this.interceptors.respond.forEach(interceptor => {
            chain.push(interceptor)
        })

        //  [{...请求拦截器},{resolve: dispatchRequest,reject: undefined},{...响应拦截器}]

        let promise = Promise.resolve(config)
        // 实现链式调用
        while (chain.length) {
            const { resolve, reject } = chain.shift()!
            promise = promise.then(resolve, reject)
        }

        return promise
    }

    get(url: String, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethWithOutData('get', url, config)
    }

    delete(url: String, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethWithOutData('delete', url, config)
    }

    head(url: String, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethWithOutData('head', url, config)
    }

    options(url: String, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethWithData('options', url, data, config)
    }

    post(url: String, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethWithData('post', url, data, config)
    }

    patch(url: String, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethWithData('patch', url, data, config)
    }

    /**
     * 发送不带数据的请求
     *
     * @param {Method} method
     * @param {String} url
     * @param {AxiosRequestConfig} [config]
     * @returns {AxiosPromise}
     * @memberof Axios
     */
    _requestMethWithOutData(method: Method, url: String, config?: AxiosRequestConfig): AxiosPromise {
        return dispatchRequest(Object.assign(config || {}, {
            method,
            url
        }))
    }

    /**
     * 发送带数据的请求
     *
     * @param {Method} method
     * @param {String} url
     * @param {*} [data]
     * @param {AxiosRequestConfig} [config]
     * @returns {AxiosPromise}
     * @memberof Axios
     */
    _requestMethWithData(method: Method, url: String, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return dispatchRequest(Object.assign(config || {}, {
            method,
            url,
            data
        }))
    }
}
