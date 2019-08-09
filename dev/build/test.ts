import axios, { AxiosTransform } from '../../src/index'
import './index.css'

// axios({
//     url: '/simple/get',
//     method: 'get',
//     params: { a: 1, b: 2 }
// })

// get 测试

// // 传递数组
// axios({
//     url:'/test/get',
//     method:'get',
//     params:{
//         foo:[1,2,3]
//     }
// })

// // 传递对象
// axios({
//     url:'/test/get',
//     method:'get',
//     params:{
//         foo:{name:'张三'}
//     }
// })

// // 传递null
// axios({
//     url:'/test/get',
//     method:'get',
//     params:{
//         foo:'bar',
//         test:null
//     }
// })

// // 传递时间
// axios({
//     url:'/test/get',
//     method:'get',
//     params:{
//         d:new Date()
//     }
// })

// // 传递特殊字符
// axios({
//     url:'/test/get',
//     method:'get',
//     params:{
//         foo:'@$,'
//     }
// })

// // url存在hash
// axios({
//     url:'/test/get#hash',
//     method:'get',
//     params:{
//         foo:'foo'
//     }
// })

// // url存在？
// axios({
//     url:'/test/get?',
//     method:'get',
//     params:{
//         foo:'你好'
//     }
// })


// post 测试
// axios({
//     url:'/base/post',
//     method:'post',
//     data:{
//         foo:'你好',
//         name:'zhangsan'
//     }
// })

// axios({
//     url:'/buff/post',
//     method:'post',
//     data:new Int32Array([32,44])
// })

// axios({
//     url:'/base/post1',
//     method:'post',
//     timeout:2000,
//     data:{
//         foo:'你好',
//         name:'zhangsan'
//     }
// }).then(res=>{
//     console.log(res)
// }).catch((e:AxiosError) =>{
//     console.log(e.message)
//     console.log(e.config)
//     console.log(e.code)
// })


// axios({
//     url:'/base/post',
//     method:'post',
//     data:{
//         foo:'你好',
//         name:'zhangsan'
//     },
//     headers:{
//         'Content-Type':'application/json'
//     }
// })

// axios({
//     url:'/base/post',
//     method:'post',
//     data:{
//         foo:'你好',
//         name:'zhangsan'
//     },
//     headers:{
//         'Content-Type':'application/json',
//         'Accept':'application/json text/plain */*'
//     }
// })

// axios({
//     url:'/base/post',
//     method:'post',
//     data:new URLSearchParams('a=zhangsan&age=18'),
//     headers:{
//         // 'Content-Type':'application/x-www-form-urlencoded'
//     }
// })

// axios({
//     method: 'get',
//     url: '/test/get',
//     params: { msg: 'get msg' }
// }).then(res => {
//     console.log(res)
// })


// interface Result {
//     msg?: String
// }


// axios<Result>('/test/get', {
//     method: 'get',
//     params: { msg: 'get msg1111' }
// }).then((res) => {
//     console.log(res.data.msg)
// })

// axios.request<Result>('/test/get', {
//     method: 'get',
//     params: { msg: 'get msg111112313' }
// }).then((res) => {
//     console.log(res.data.msg)
// })




// axios.request('/test/get',{
//     method:'get',
//     params:{msg:'get msg333'}
// }).then(res=>{
//     console.log(res)
// })


// axios.post('/base/post',{msg:'post msg'}).then(res=>{
//     console.log(res)
// })

// axios.interceptors.request.use(config => {
//     console.log(config)
//     return config
// })
// axios.interceptors.request.use(config => {
//     config.headers.test += '2'
//     return config
// })
// axios.interceptors.request.use(config => {
//     config.headers.test += '3'
//     return config
// })

// axios.interceptors.respond.use(res => {
//     res.data += '1'
//     return res
// })
// let interceptor = axios.interceptors.respond.use(res => {
//     res.data += '2'
//     return res
// })
// axios.interceptors.respond.use(res => {
//     res.data += '3'
//     return res
// })

// axios.interceptors.respond.eject(interceptor)

// axios({
//     url: '/test/get',
//     method: 'get',
//     headers: {
//         test: ''
//     }
// }).then((res) => {
//     console.log(res.data)
// })

// axios.defaults.headers.common['test2']=13213
// // axios.defaults.headers.

// axios({
//   url: '/base/post',
//   method: 'post',
//   data: 'a=1&b=2',
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })
axios({
  transformRequest: [(function(data) {
    // console.log(qs.stringify)
    // return qs.stringify(data)
    return data
  }), ...(axios.defaults.transformRequest as AxiosTransform[])],
  transformRespond: [...(axios.defaults.transformRespond as AxiosTransform[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }],
  url: '/base/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})

// const a= [1,2,3,4,5]

// const b = [6,7]

// b.push(...a)

// console.log(b)

if(module.hot){
  module.hot.accept()
}
