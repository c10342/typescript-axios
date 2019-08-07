
// 项目公共类型定义文件

// 定义一个字面量类型
export type Method = 'get' | 'GET' | 'post' | 'POST' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'put' | 'PUT' | 'patch' | 'PATCH'

// axios配置文件类型 config
export interface AxiosRequestConfig {
    url?: string;
    method?: Method;
    params?: any;   // 请求参数
    data?: any; // post请求的数据
    headers?: any;
    responseType?: XMLHttpRequestResponseType; // 服务器响应数据类型
    timeout?: number // 超时时间
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
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> { }

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
    request<T = any>(url:String | AxiosRequestConfig,config?: AxiosRequestConfig): AxiosPromise<T>
    get<T = any>(url: String, config?: AxiosRequestConfig): AxiosPromise<T>
    delete<T = any>(url: String, config?: AxiosRequestConfig): AxiosPromise<T>
    head<T = any>(url: String, config?: AxiosRequestConfig): AxiosPromise<T>
    options<T = any>(url: String, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
    post<T = any>(url: String, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
    patch<T = any>(url: String, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}


export interface AxiosInstance extends Axios {
    // (config:AxiosRequestConfig) 方法参数类型
    // AxiosPromise 方法返回值
    <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

    // 实现函数重载
    <T = any>(url: String, config?: AxiosRequestConfig): AxiosPromise<T>
}