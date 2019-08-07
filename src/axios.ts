import { AxiosInstance } from './types/index';
import Axios from './core/Axios'
import { extend } from './helpers/util';

function createInstance(): AxiosInstance {

    const context = new Axios()

    const instance = Axios.prototype.request.bind(context)
    // 实现混合对象
    return extend(instance, context)
}

const axios = createInstance()

export default axios