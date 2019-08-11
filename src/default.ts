import { AxiosRequestConfig } from './types/index'
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'

// 默认配置
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  validateStatus: function(status: number): boolean {
    return status >= 200 && status < 300
  },
  headers: {
    // 每个请求都带上common里面的key-val
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  },
  // 请求前修改数据
  transformRequest: [
    function(data: any, headers: any): any {
      // 处理请求头
      processHeaders(headers, data)
      // 处理请求数据
      return transformRequest(data)
    }
  ],
  // 请求后修改数据
  transformRespond: [
    function(data: any): any {
      // 处理响应数据
      return transformResponse(data)
    }
  ]
}

// 参数不是在请求体中的
const methodsNoData = ['get', 'delete', 'head', 'options']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

// 参数在请求体中,默认以formData表单形式提交
const methodswithData = ['post', 'put', 'patch']
methodswithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
