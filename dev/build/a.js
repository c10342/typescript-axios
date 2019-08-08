import axios from '../../src/index'
import qs from 'qs'

axios({
  transformRequest: [(function(data) {
    console.log(qs)
    // return qs.stringify(data)
    return data
  }), ...(axios.defaults.transformRequest )],
  transformRespond: [...(axios.defaults.transformRespond), function(data) {
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
  console.log(res)
})
