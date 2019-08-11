import { AxiosRequestConfig, AxiosStatic } from './types/index'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './default'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)

  const instance = Axios.prototype.request.bind(context)

  // 实现混合对象
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

// 创建一个新的实例
axios.create = function(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken

axios.Cancel = Cancel

axios.isCancel = isCancel

axios.all = function(promises) {
  return Promise.all(promises)
}

axios.spread = function(callback) {
  return function(arr) {
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios

export default axios
