import { AxiosRequestConfig } from "../types";
import { isPlainObject, deepMerge } from "../helpers/util";

const strats = Object.create(null)

// 合并值,用户没传递进来的获取默认值
function defaultStrat(val1: any, val2: any): any {
    return typeof val2 !== 'undefined' ? val2 : val1
}
// 获取val2的值
function fromVal2Strat(val1: any, val2: any): any {
    if (typeof val2 !== 'undefined') {
        return val2
    }
}

// 深拷贝对象
function deepMergeStrat(val1: any, val2: any): any {
    if (isPlainObject(val2)) {
        return deepMerge(val1, val2)
    } else if (typeof val2 !== 'undefined') {
        return val2
    } else if (isPlainObject(val1)) {
        return deepMerge(val1)
    } else {
        return val1
    }
}

// 这些值需要用户传递进来,即只取val2的值
const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
    strats[key] = fromVal2Strat
})

// 这些值需要深拷贝
const stratKeyDeepMerge = ['headers']

stratKeyDeepMerge.forEach(key => {
    strats[key] = deepMergeStrat
})

/**
 * config1是默认配置,config2是用户传递进来的配置
 *
 * @export
 * @param {AxiosRequestConfig} config1
 * @param {AxiosRequestConfig} [config2]
 * @returns {AxiosRequestConfig}
 */
export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
    if (!config2) {
        config2 = {}
    }

    const config = Object.create(null)

    for (const key in config2) {
        mergeFiled(key)
    }

    for (const key in config1) {
        if (!config2[key]) {
            mergeFiled(key)
        }
    }

    // 合并策略，['url', 'params', 'data']这些没有默认配置，只能获取用户传递进来的
    function mergeFiled(key: string): void {
        const strat = strats[key] || defaultStrat
        config[key] = strat(config1[key], config2![key])
    }

    return config
}