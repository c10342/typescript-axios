import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isUrlSameOrign, isFormData } from '../helpers/util'
import cookie from '../helpers/cookie'

/**
 * 原生ajax
 *
 * @export
 * @param {AxiosRequestConfig} config
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config
    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    request.send(data)

    // 处理配置
    function configureRequest(): void {
      // 设置服务器返回的数据类型
      if (responseType) {
        request.responseType = responseType
      }

      // 设置跨域带上请求域cookie
      if (withCredentials) {
        request.withCredentials = withCredentials
      }

      // 设置超时时间
      if (timeout) {
        request.timeout = timeout
      }
    }

    // 事件监听
    function addEvents(): void {
      // 网络发生错误
      request.onerror = function() {
        reject(createError('NetWork Error', config, 'error', request))
      }

      // 响应超时
      request.ontimeout = function() {
        reject(createError(`Timeout of ${timeout} ms execeded`, config, 'error', request))
      }
      // 监听下载
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      // 监听上传
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
      request.onreadystatechange = function() {
        if (request.readyState !== 4) {
          return
        }

        // 网络错误或者超时 status为0
        if (request.status === 0) {
          return
        }

        const responseHeaders = parseHeaders(request.getAllResponseHeaders()) // 获取响应头
        const responseData =
          responseType && responseType === 'text' ? request.responseText : request.response // 服务器响应数据

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
    }

    // 处理请求头
    function processHeaders(): void {
      // 如果数据类型FormData,需要删除Content-Type,让浏览器自动识别
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      // 当需要携带cookie和在同源的情况下才需要带上token
      if ((withCredentials || isUrlSameOrign(url!)) && xsrfCookieName && xsrfHeaderName) {
        const xsrfVal = cookie.read(xsrfCookieName)
        if (xsrfVal) {
          headers[xsrfHeaderName] = xsrfVal
        }
      }
      if (auth) {
        // btoa 文本转成base64
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }
      Object.keys(headers).forEach(name => {
        // data不存在设置content-type是没有意义的
        if (!data && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    // 取消请求
    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort() // 取消请求
          reject(reason)
        })
      }
    }
    // 处理响应
    function handelResponse(res: AxiosResponse): void {
      if (!validateStatus || validateStatus(res.status)) {
        resolve(res)
      } else {
        reject(
          createError(
            `Request failed with status code ${res.status}`,
            config,
            'error',
            request,
            res
          )
        )
      }
    }
  })
}
