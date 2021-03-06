import InterceptorManager from '../core/interceptorManager'

// 项目公共类型定义文件

// 定义一个字面量类型
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// axios配置文件类型 config
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  params?: any // 请求参数
  data?: any // post请求的数据
  headers?: any
  responseType?: XMLHttpRequestResponseType // 服务器响应数据类型
  timeout?: number // 超时时间
  // 请求前修改数据
  transformRequest?: AxiosTransform | AxiosTransform[]
  // 请求后修改数据
  transformRespond?: AxiosTransform | AxiosTransform[]
  cancelToken?: CancelToken // 取消请求配置
  withCredentials?: boolean // 设置跨域带上请求域cookie
  xsrfCookieName?: string // token存储在cookie中的名称
  xsrfHeaderName?: string // 发送token的header名称
  onDownloadProgress?: (e: ProgressEvent) => void // 下载进度
  onUploadProgress?: (e: ProgressEvent) => void // 上传进度
  auth?: AxiosBasicCredentials // http授权
  validateStatus?: (status: number) => boolean // 自定义合法状态码
  paramsSerializer?: (params: any) => string // 自定义参数序列化方法
  baseURL?: string // 公共请求地址

  // 索引  xxx['name']
  [propsName: string]: any
}

// 响应类型
export interface AxiosResponse<T = any> {
  data: T // 服务器响应数据
  status: number // 响应状态
  statusText: string
  headers: any // 响应头
  config: AxiosRequestConfig // 配置文件
  request: any // xhr 对象
}

/**
 * axios请求返回类型
 *
 * @export
 * @interface AxiosPromise
 * @extends {Promise<AxiosResponse<T>>}
 * @template T
 */
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

/**
 * 错误类型
 *
 * @export
 * @interface AxiosError
 */
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string | null // 错误码
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

/**
 * Axios类中的方法
 *
 * @export
 * @interface Axios
 */
export interface Axios {
  // 拦截器
  interceptors: {
    request: InterceptorManager<AxiosRequestConfig>
    respond: InterceptorManager<AxiosResponse>
  }
  // 配置
  defaults: AxiosRequestConfig
  request<T = any>(url: String | AxiosRequestConfig, config?: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: String, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: String, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: String, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: String, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: String, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: String, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  getUri(config?: AxiosRequestConfig): string // 获取请求的url
}

/**
 * 函数重载，要么有2个参数，要么有1个参数
 *
 * @export
 * @interface AxiosInstance
 * @extends {Axios}
 */
export interface AxiosInstance extends Axios {
  // (config:AxiosRequestConfig) 方法参数类型
  // AxiosPromise 方法返回值
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  // 实现函数重载
  <T = any>(url: String, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean

  all<T>(promises: Array<T | Promise<T>>): Promise<T[]>
  spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R
  Axios: AxiosClassStatic
}

export interface AxiosClassStatic {
  // new 指的是勒种的构造器
  new (config: AxiosRequestConfig): Axios
}

/**
 * 定义拦截器接口
 *
 * @export
 * @interface AxiosInterceptorManager
 * @template T
 */
export interface AxiosInterceptorManager<T> {
  use(resolve: ResolveFn<T>, reject?: RejectFn): number

  eject(id: number): void
}

export interface ResolveFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectFn {
  (error: any): any
}

// 定义函数类型接口
export interface AxiosTransform {
  (data: any, headers?: any): any
}

// 取消请求的类
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

// 取消请求操作函数
export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}

export interface AxiosBasicCredentials {
  username: string
  password: string
}
