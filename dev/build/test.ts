import axios, { AxiosTransform, Canceler } from '../../src/index'

import qs from 'qs'

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
// axios({
//   transformRequest: [(function(data) {
//     // console.log(qs.stringify)
//     // return qs.stringify(data)
//     return data
//   }), ...(axios.defaults.transformRequest as AxiosTransform[])],
//   transformRespond: [...(axios.defaults.transformRespond as AxiosTransform[]), function(data) {
//     if (typeof data === 'object') {
//       data.b = 2
//     }
//     return data
//   }],
//   url: '/base/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// }).then((res) => {
//   console.log(res.data)
// })
// console.log(123)
// const CancelToken = axios.CancelToken
// const source = CancelToken.source()

// axios.get('/cancel/get', {
//   cancelToken: source.token
// }).then(res=>{
//   // console.log(res)
// }).catch(function (e) {
//   if (axios.isCancel(e)) {
//     console.log('Request canceled', e.message)
//   }
// })




// setTimeout(() => {
//   source.cancel('Operation canceled by the user.')

//   axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function (e) {
//     if (axios.isCancel(e)) {
//       console.log(e.message)
//     }
//   })
// }, 100)

// let cancel: Canceler

// axios.get('/cancel/get', {
//   cancelToken: new CancelToken(c => {
//     cancel = c
//   })
// }).catch(function (e) {
//   if (axios.isCancel(e)) {
//     console.log('Request canceled')
//   }
// })

// setTimeout(() => {
//   cancel()
// }, 200)

// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })

// instance.get('/more/get').then(res => {
//   console.log(res)
// })
// instance.get('https://cnodejs.org/api/v1/topics').then(res => {
//   console.log(res)
// })
// const instance = axios.create({
//   onDownloadProgress: function (e) {
//     console.log('onDownloadProgress', e.total, e.loaded)
//   },
//   onUploadProgress: function (e) {
//     console.log('onUploadProgress', e.total, e.loaded)
//   }
// })
// document.getElementById('downLoad')!.addEventListener('click', function () {
//   instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
// })

// document.getElementById('upLoad')!.addEventListener('click', function () {
//   const data = new FormData()
//   const fileEl = document.getElementById('file') as HTMLInputElement
//   if (fileEl.files) {
//     data.append('file', fileEl.files[0])

//     instance.post('/more/upload', data)
//   }
// })

// axios.post('/more/post', {
//   a: 1
// }, {
//   auth: {
//     username: 'Yee',
//     password: '123456'
//   }
// }).then(res => {
//   console.log(res)
// })

// axios.get('/more/304').then(res => {
//   console.log(res)
// }).catch((e) => {
//   console.log(e.message)
// })

// axios.get('/more/304', {
//   validateStatus(status) {
//     return status >= 200 && status < 400
//   }
// }).then(res => {
//   console.log(res)
// }).catch((e) => {
//   console.log(e.message)
// })


// axios.get('/simple/get', {
//   params: new URLSearchParams('a=b&c=d')
// }).then(res => {
//   console.log(res)
// })

// axios.get('/simple/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b', 'c']
//   }
// }).then(res => {
//   console.log(res)
// })

// const instance = axios.create()

// instance.get('https://cnodejs.org/api/v1/topics').then(res => {
//   console.log(res)
// })
// const instance1 = axios.create({
//   baseURL:'https://cnodejs.org/api/v1'
// })
// instance1.get('/topics').then(res => {
//   console.log(res)
// })

function getA() {
  return axios.get('/more/A')
}

function getB() {
  return axios.get('/more/B')
}

axios.all([getA(), getB()])
  .then(axios.spread(function (resA, resB) {
    console.log(resA.data)
    console.log(resB.data)
  }))

axios.all([getA(), getB()])
  .then(([resA, resB]) => {
    console.log(resA.data)
    console.log(resB.data)
  })

const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(axios.getUri(fakeConfig))

if (module.hot) {
  module.hot.accept()
}
