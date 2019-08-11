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
 * 判断数据类型是否为FormData
 *
 * @export
 * @param {*} val
 * @returns {val is FormData}
 */
export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

/**
 * 判断是否为URLSearchParams
 *
 * @export
 * @param {*} val
 * @returns {val is URLSearchParams}
 */
export function isUrlSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

/**
 * 判断是否为绝对地址
 *
 * @export
 * @param {string} url
 * @returns {boolean}
 */
export function isAbsoluteURL(url: string): boolean {
  // 以http,https等开头的都是绝对地址
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, url?: string): string {
  return url ? baseURL.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '/') : baseURL
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
    ;(to as T & U)[key] = from[key] as any
  }
  // T & U 混合类型
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

interface UrlOrign {
  protocol: string
  host: string
}

/**
 * 同域名的判断主要利用了一个技巧，创建一个 a 标签的 DOM，然后设置 href 属性为我们* 传入的 url，然后可以获取该 DOM 的 protocol、host。当前页面的 url 和请求的 url * 都通过这种方式获取，然后对比它们的 protocol 和 host 是否相同即可。
 *
 * @export
 * @param {string} url
 * @returns {boolean}
 */
export function isUrlSameOrign(url: string): boolean {
  const paresOrign = resolveUrl(url)

  return paresOrign.protocol === currentOrign.protocol && paresOrign.host === currentOrign.host
}
const urlParsingNode = document.createElement('a')
const currentOrign = resolveUrl(window.location.href)

function resolveUrl(url: string): UrlOrign {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return {
    protocol, // 协议
    host
  }
}
