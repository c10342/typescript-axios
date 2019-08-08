import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from '../types/index'
import xhr from './xhr';
import { buildURL } from '../helpers/url';
import { flattenHeaders } from '../helpers/headers';
import transform from './transform';
import defaults from '../default';

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
    // 请求处理url
    config.url = transformURL(config)

    // 处理请求头和请求数据
    config.data = transform(config.data,config.headers,config.transformRequest)

    // 合并默认配置和用户输入的配置
    config.headers = flattenHeaders(config.headers,config.method!)
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
 * 处理响应数据
 *
 * @param {AxiosResponse} res
 * @returns {AxiosResponse}
 */
function transformResponseData(res:AxiosResponse):AxiosResponse{
    res.data = transform(res.data,res.headers,res.config.transformRespond)
    return res
}
