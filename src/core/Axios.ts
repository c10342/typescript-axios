import { AxiosRequestConfig, AxiosPromise, Method } from './../types/index';
import dispatchRequest from './dispatchRequest';


export default class Axios {
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
        return dispatchRequest(config)
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

    _requestMethWithOutData(method: Method, url: String, config?: AxiosRequestConfig): AxiosPromise {
        return dispatchRequest(Object.assign(config || {}, {
            method,
            url
        }))
    }

    _requestMethWithData(method: Method, url: String, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return dispatchRequest(Object.assign(config || {}, {
            method,
            url,
            data
        }))
    }
}
