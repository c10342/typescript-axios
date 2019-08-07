import  {AxiosRequestConfig}  from './types/index'

// 默认配置
const defaults : AxiosRequestConfig = {
    method: 'get',
    timeout: 0,
    headers: {
        // 每个请求都带上common里面的key-val
        common: {
            Accept: 'application/json,text/plain,*/*'
        }
    }
}

// 参数不是在请求体中的
const methodsNoData = ['get','delete','head','options']

methodsNoData.forEach(method=>{
    defaults.headers[method] = {}
})

// 参数在请求体中
const methodswithData = ['post','put','patch']
methodswithData.forEach(method=>{
    defaults.headers[method] = {
        'Content-Type':'application/x-www-form-urlencoded'
    }
})

export default defaults