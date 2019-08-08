import {  AxiosRequestConfig, AxiosStatic } from './types/index';
import Axios from './core/Axios'
import { extend } from './helpers/util';
import defaults from './default';
import mergeConfig from './core/mergeConfig';

function createInstance(config:AxiosRequestConfig): AxiosStatic {

    const context = new Axios(config)

    const instance = Axios.prototype.request.bind(context)

    // 实现混合对象
    extend(instance, context)

    return instance as AxiosStatic
}

const axios = createInstance(defaults)

// 创建一个新的实例
axios.create = function(config){
    return createInstance(mergeConfig(defaults,config))
}



export default axios