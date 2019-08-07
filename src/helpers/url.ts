import { isDate, isPlainObject } from "./util";

/**
 * 把参数转码，同时把一些特殊字符还原回来，特殊字符不转码
 *
 * @param {string} val
 * @returns {string}
 */
function encode(val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/ig, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/ig, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/ig, '[')
        .replace(/%5D/ig, ']')
}

/**
 * 根据请求参数和url构建get请求url
 *
 * @export
 * @param {string} url
 * @param {*} [params]
 * @returns {string}
 */
export function buildURL(url: string, params?: any): string {
    if (!params) {
        return url
    }

    // 存储get参数，如 a=123
    let parts: string[] = []

    Object.keys(params).forEach(key => {
        let val = params[key]

        if (val === null || val === undefined) {
            return
        }

        let values = []

        // 请求参数类型可能是数组或者特殊符号,如{a:1,b:[1,2],c:'%'} a=1&b[]=1&b[]=2&c=%
        // 这里统一转成数组处理
        if (Array.isArray(val)) {
            values = val
            key += '[]'
        } else {
            values = [val]
        }

        values.forEach(v => {
            if (isDate(v)) { // 将时间转化字符串
                v = v.toISOString()
            } else if (isPlainObject(v)) {
                v = JSON.stringify(v)
            }

            parts.push(`${encode(key)}=${encode(v)}`)
        })
    })

    let serializedParams = parts.join('&')

    if (serializedParams) {
        // 去除hash  #hash
        const markHash = url.indexOf('#')
        if (markHash !== -1) {
            url = url.slice(0, markHash)
        }
        url += (url.indexOf('?') === -1 ? '?' : '') + serializedParams
    }
    return url
}