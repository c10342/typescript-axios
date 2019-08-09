import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index';
import { parseHeaders } from '../helpers/headers';
import { createError } from '../helpers/error';

/**
 * 原生ajax
 *
 * @export
 * @param {AxiosRequestConfig} config
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const { data = null, url, method = 'get', headers, responseType, timeout } = config

        const request = new XMLHttpRequest()

        // 设置服务器返回的数据类型
        if (responseType) {
            request.responseType = responseType
        }

        // 设置超时时间
        if (timeout) {
            request.timeout = timeout
        }

        request.open(method.toUpperCase(), url!, true)

        // 网络发生错误
        request.onerror = function () {
            reject(createError('NetWork Error', config, 'error', request))
        }

        // 响应超时
        request.ontimeout = function () {
            reject(createError(`Timeout of ${timeout} ms execeded`, config, 'error', request))
        }

        request.onreadystatechange = function () {
            if (request.readyState !== 4) {
                return
            }

            // 网络错误或者超时 status为0
            if (request.status === 0) {
                return
            }

            const responseHeaders = parseHeaders(request.getAllResponseHeaders()) // 获取响应头
            const responseData = responseType === 'text' ? request.responseText : request.response  // 服务器响应数据

            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }

            handelResponse(response)
        }

        // 处理响应
        function handelResponse(res: AxiosResponse): void {
            if (res.status >= 200 && res.status < 300) {
                resolve(res)
            } else {
                reject(createError(`Request failed with status code ${res.status}`, config, 'error', request, res))
            }
        }

        Object.keys(headers).forEach(name => {
            // data不存在设置content-type是没有意义的
            if (!data && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })

        request.send(data)
    })
}