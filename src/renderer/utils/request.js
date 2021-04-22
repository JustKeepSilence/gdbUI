/**
 * 使用axios发送get和post请求
 */

 import axios from 'axios'
 import Base64 from 'js-base64'
 import { getCookie } from '@/utils/cookie'

 const request = axios.create({
     baseURL: '',
     timeout: 5000000,  // 设置请求的超时时间,
     headers:{'Content-Type': 'application/json'},
 })
 // 添加请求拦截器
 request.interceptors.request.use(
    async config => {
         // 在发送请求之前进行的配置
         const userToken = await getCookie('token') // 获取cookie中的用户token
         if (userToken) {
             const userName = await getCookie('userName')
             const token = 'Basic ' + Base64.encode(`${userName}:${userToken}`)
             // 如果有token,则所有的请求都必须携带上token信息
             config.headers['Authorization'] = token
         }
         return config
     },
     error => {
         return Promise.reject(error)
     }
 )
 // 添加响应拦截器
 request.interceptors.response.use(
     response => {
         const res = response.data // 获取响应的数据
         return res
     },
     error => {
         if(error.response){
             return Promise.reject(error.response.data)
         }else if (error.request){
             return Promise.reject(error.request)
         }else{
             return Promise.reject(error)
         }
     }
 )
 
 
 export default request
 
 