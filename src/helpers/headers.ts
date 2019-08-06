import { isPlainObject } from "./util";

/**
 * 请求头的key对大小写不敏感，我们需要统一转换，方便判断用户是否手动添加了某个请求头
 *
 * @param {*} headers
 * @param {string} normalizeName
 */
function normalizeHeaderName(headers:any,normalizeName:string):void{
    if(!headers){
        return
    }
    Object.keys(headers).forEach(name=>{
        if(name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()){
            headers[normalizeName] = headers[name]
            delete headers[name]
        }
    })
}

/**
 * 处理请求头
 *
 * @export
 * @param {*} headers
 * @param {*} data
 * @returns {*}
 */
export function processHeaders(headers:any,data:any) :any{
    normalizeHeaderName(headers,'Content-Type')
    if(isPlainObject(data)){
        if(headers && !headers['Content-Type']){ // 有些数据类型不需要手动添加Content-Type，浏览器会自动根据数据类型添加上去
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }

    return headers
}

/**
 * 把响应头转化为对象
 *
 * @export
 * @param {string} headers
 * @returns {*}
 */
export function parseHeaders(headers:string):any{
    let parse = Object.create({}) // 构建一个空对象
    if(!headers){
        return parse
    }

    headers.split('\r\n').forEach(line=>{
        let [key,val] = line.split(':')

        key = key.trim().toLowerCase()

        if(!key){
            return
        }

        if(val){
            val = val.trim()
            parse[key] = val
        }
    })

    return parse
}