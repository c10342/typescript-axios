import { AxiosInstance, AxiosRequestConfig } from './types/index';
import Axios from './core/Axios'
import { extend } from './helpers/util';
import defaults from './default';

function createInstance(config:AxiosRequestConfig): AxiosInstance {

    const context = new Axios(config)

    const instance = Axios.prototype.request.bind(context)
    
    // 实现混合对象
    return extend(instance, context)
}

const axios = createInstance(defaults)

export default axios