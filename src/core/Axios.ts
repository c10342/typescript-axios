import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
  Method,
  ResolveFn,
  RejectFn
} from './../types/index'
import dispatchRequest, { transformURL } from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'

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
  defaults: AxiosRequestConfig

  constructor(defaultsConfig: AxiosRequestConfig) {
    // 初始化拦截器
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      respond: new InterceptorManager<AxiosResponse>()
    }
    // 初始化默认配置
    this.defaults = defaultsConfig
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
    // 把用户传递进来的配置跟默认配置进行合并
    config = mergeConfig(this.defaults, config)
    config.method = config.method.toLocaleLowerCase()

    // 定义一个数组,方便实现链式调用
    const chain: PromiseChain<any>[] = [
      {
        resolve: dispatchRequest,
        reject: undefined
      }
    ]

    // request拦截器后添加的先执行
    // this.interceptors.request.forEach  是执行 this.interceptors.request对象中的forEach方法，不是遍历
    // request后添加的先执行
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor) // 把拦截器添加到chain中
    })
    // respond拦截器先添加的先执行
    this.interceptors.respond.forEach(interceptor => {
      chain.push(interceptor)
    })

    //  chain = [{...请求拦截器},{resolve: dispatchRequest,reject: undefined},{...响应拦截器}]
    //  [{...请求拦截器},{resolve: dispatchRequest,reject: undefined},{...响应拦截器}]

    let promise = Promise.resolve(config)
    // 实现链式调用
    while (chain.length) {
      // 取出chain第一个元素并删除
      const { resolve, reject } = chain.shift()!
      promise = promise.then(resolve, reject)
    }
    return promise
  }

  // 获取请求的url
  getUri(config: AxiosRequestConfig): string {
    config = mergeConfig(this.defaults, config)
    return transformURL(config)
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
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
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
  _requestMethWithData(
    method: Method,
    url: String,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
