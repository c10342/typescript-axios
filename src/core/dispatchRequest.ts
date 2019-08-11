import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'
import { isAbsoluteURL, combineURL } from '../helpers/util'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 发送请求前先检查时候取消过请求
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(
    res => {
      return transformResponseData(res)
    },
    e => {
      if (e && e.response) {
        e.response = transformResponseData(e.responed)
      }
      return Promise.reject(e)
    }
  )
}

/**
 * 处理配置
 *
 * @param {AxiosRequestConfig} config
 */
function processConfig(config: AxiosRequestConfig): void {
  // 请求处理url
  config.url = transformURL(config)

  // 处理请求头和请求数据
  config.data = transform(config.data, config.headers, config.transformRequest)

  // 合并默认配置headers和用户输入的配置headers
  config.headers = flattenHeaders(config.headers, config.method!)
}

/**
 * 构建请求url
 *
 * @param {AxiosRequestConfig} config
 * @returns {string}
 */
export function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  // url! 断言url不为空
  return buildURL(url!, params, paramsSerializer)
}

/**
 * 处理响应数据
 *
 * @param {AxiosResponse} res
 * @returns {AxiosResponse}
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformRespond)
  return res
}

// 已经取消过请求就不用在此发送请求了
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.canceltoken) {
    config.canceltoken.throwIfRequested()
  }
}
