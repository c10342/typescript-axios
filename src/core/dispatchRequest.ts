import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from '../types/index'
import xhr from './xhr';
import { buildURL } from '../helpers/url';
import { transformRequest, transformResponse } from '../helpers/data';
import { processHeaders } from '../helpers/headers';

export default function dispatchRequest(config:AxiosRequestConfig):AxiosPromise{
    processConfig(config)
    return xhr(config).then(res=>{
        return transformResponseData(res)
    })
}

/**
 * 处理配置
 *
 * @param {AxiosRequestConfig} config
 */
function processConfig(config:AxiosRequestConfig):void{
    config.url = transformURL(config)

    // transformHeaders必须在处理数据前执行，否则数据经过处理之后可能会与headers设置的不一致
    config.headers = transformHeaders(config)
    
    config.data = transformRequestData(config)
}

/**
 * 构建get请求url
 *
 * @param {AxiosRequestConfig} config
 * @returns {string}
 */
function transformURL(config:AxiosRequestConfig):string{
    const {url,params} = config
    // url! 断言url不为空
    return buildURL(url!,params)
}

/**
 * 处理post请求数据
 *
 * @param {AxiosRequestConfig} config
 * @returns {*}
 */
function transformRequestData(config:AxiosRequestConfig):any{
    const {data} = config

    return transformRequest(data)
}

/**
 * 处理请求头
 *
 * @param {AxiosRequestConfig} config
 * @returns {*}
 */
function transformHeaders(config:AxiosRequestConfig):any{
    const {headers = {} , data} = config

    return processHeaders(headers,data)
}

/**
 * 尝试把服务器返回来的数据转化为json
 *
 * @param {AxiosResponse} res
 * @returns {AxiosResponse}
 */
function transformResponseData(res:AxiosResponse):AxiosResponse{
    res.data = transformResponse(res.data)
    return res
}
