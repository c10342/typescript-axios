import { isPlainObject } from "./util";

/**
 * 处理post请求参数
 * XMLHttpRequest post 原生支持Blob, BufferSource, FormData, URLSearchParams, ReadableStream, or USVString
 * string类型属于USVString
 *
 * @export
 * @param {*} data
 * @returns {*}
 */
export function transformRequest(data: any): any {
    if (isPlainObject(data)) {
        data = JSON.stringify(data)
    }
    return data
}

/**
 * 尝试把服务器响应数据转化为json
 *
 * @export
 * @param {*} data
 * @returns {*}
 */
export function transformResponse(data: any): any {
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data)
        } catch (error) {
            // do nothing
        }
    }
    return data
}