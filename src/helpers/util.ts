const toString = Object.prototype.toString

/**
 * 判断是否为时间类型
 * val is Date类型保护
 *
 * @export
 * @param {*} val
 * @returns {val is Date}
 */
export function isDate(val: any): val is Date {
    return toString.call(val) === '[object Date]'
}

/**
 * 判断是否为对象
 * null 也是Object类型
 *
 * @export
 * @param {*} val
 * @returns {val is Object}
 */
export function isObject(val: any): val is Object {
    return val !== null && typeof val === 'object'
}

/**
 * 判断是否为普通对象
 *
 * @export
 * @param {*} val
 * @returns {val is Object}
 */
export function isPlainObject(val: any): val is Object {
    return toString.call(val) === '[object Object]'
}

/**
 * 把from上的属性拷贝一份到to中
 *
 * @export
 * @template T
 * @template U
 * @param {T} to
 * @param {U} from
 * @returns {(T & U)}
 */
export function extend<T, U>(to: T, from: U): T & U {
    for (const key in from) {
        ; (to as T & U)[key] = from[key] as any
    }

    return to as T & U
}

/**
 * 深拷贝对象
 *
 * @export
 * @param {...any[]} objs
 * @returns {*}
 */
export function deepMerge(...objs: any[]): any {
    const result = Object.create(null)
    objs.forEach(obj => {
        if (obj) {
            Object.keys(obj).forEach(key => {
                const val = obj[key]
                if (isPlainObject(val)) {
                    if (result[key]) {
                        result[key] = deepMerge(result[key], val)
                    } else {
                        result[key] = deepMerge(val)
                    }
                } else {
                    result[key] = val
                }
            })
        }
    })
    return result
}

