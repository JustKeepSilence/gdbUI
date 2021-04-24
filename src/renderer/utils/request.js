/**
 * 使用axios发送get和post请求
 */

import axios from 'axios'
import Base64 from 'js-base64'
import { getCookie } from '@/utils/cookie'
const fs = require("fs");
const path = require('path')

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

const r = () => {
    return new Promise((resolve, reject) => {
        getCookie('mode').then(async (mode) => {
            let request = null;
            if (mode === 'http') {
                request = axios.create({
                    baseURL: '',
                    timeout: 5000000,  // 设置请求的超时时间,
                    headers: { 'Content-Type': 'application/json' },
                })
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
                        if (error.response) {
                            return Promise.reject(error.response.data)
                        } else if (error.request) {
                            // mode error
                            const message = '请选择正确的客户端连接模式'
                            return Promise.reject({message})
                        } else {
                            return Promise.reject(error)
                        }
                    }
                )
                // 添加请求拦截器      
            } else if (mode === 'https') {
                const ip = await getCookie('ip')
                const port = parseInt(ip.split(':')[1])
                const host = ip.split(':')[0]
                if (isNaN(port)) {
                    reject({message: 'invalid port'})
                }
                const url = new URL(`https://${host}`)
                const userToken = await getCookie('token') // 获取cookie中的用户token
                if (process.env.NODE_ENV === 'development'){
                request = {
                    hostname: url.hostname,
                    port,
                    path: '',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    maxHeaderSize: 10000000,
                    cert: fs.readFileSync(path.join(__dirname, '../ssl/gdbClient.crt')),
                    key: fs.readFileSync(path.join(__dirname, '../ssl/gdbClient.key')),
                }
            }else{
                request = {
                    hostname: url.hostname,
                    port,
                    path: '',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    maxHeaderSize: 10000000,
                    cert: fs.readFileSync(path.join(process.cwd(), 'resources/ssl/gdbClient.crt')),
                    key: fs.readFileSync(path.join(process.cwd(), 'resources/ssl/gdbClient.key')),
                }
            }
                if (userToken) {
                    const userName = await getCookie('userName')
                    const token = 'Basic ' + Base64.encode(`${userName}:${userToken}`)
                    // 如果有token,则所有的请求都必须携带上token信息
                    request.headers['Authorization'] = token
                }
            }
            resolve(request)
        })
    })
}

export { r }

