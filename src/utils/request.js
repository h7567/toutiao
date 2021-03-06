// 封装请求工具 request.js
// 对于axios 二次封装

import axios from 'axios'
import router from '@/router'
import JsonBig from 'json-bigint'
// 写拦截器和其他操作
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 成功时执行 ,第一个参数会有一个config  config是所有axios的请求信息
  // 返回config 返回的配置会作为请求参数 进行请求
  // 在返回之前注入token
  const token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 失败时执行 axios支持promise 失败了直接reject reject会进入axios的catch中
  return Promise.reject(error)
})
// 解决大数字问题
// 对axios的返回的数据进行自定义处理  json-big 替代=> json
axios.defaults.transformResponse = [function (data) {
  // 判断是否为空,不为空则进行数值处理
  const res = data ? JsonBig.parse(data) : {}
  return res
}]
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 成功时执行 第一个参数是响应体
  // 对数据解构扒皮data.data.=>data.
  return response.data ? response.data : {}
}, function (error) {
//   失败时执行
  // 当请求状态码 不是200/201/204的时候,表示业务执行错了,处理异常
  // error是错误对象里面包含了错误的状态码和响应信息
  // 401 状态码 表示认证失败 用户身份不对
  // 更换token 粗暴的方式 =>返回登录页,清除token
  if (error.response.status === 401) {
    //   当前token错误的话,清除token
    localStorage.removeItem('user-token')
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
