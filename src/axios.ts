import { AxiosInstance } from './types/index';
import Axios from './core/Axios'
import { extend } from './helpers/util';

function createInstance():AxiosInstance{
    // 实现混合对象
    const context = new Axios()

    const instance = Axios.prototype.request.bind(context)

    return extend(instance,context)
}

const axios = createInstance()

export default axios