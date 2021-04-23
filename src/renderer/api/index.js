/**
 * index js
 */

import {r} from '@/utils/request'
import { getCookie } from '@/utils/cookie'
const https = require('https')
const fs = require('fs')

/**
 * send post request 
 * @param {*} data : post body data 
 * @param {*} path : url path 
 */
const post = async (data, path)=>{
    const mode = await getCookie('mode')
    switch (mode) {
        case 'http':
            const ip = await getCookie('ip')
            const request = await r()
            return request({
                url: `${mode}://${ip}${path}`,
                method: 'post',
                data
            })
        case 'https':
            return new Promise((resolve, reject) => {
                let response = ""
                r().then((op) => {
                    op.path = path
                    const req = https.request(op, (res) => {
                        res.on('data', (d) => {
                            response += d.toString()
                        })
                        res.on('end', () => {
                            const respondeData = JSON.parse(response.toString())
                            if (respondeData.code === 200){
                                resolve(respondeData)  
                            }else{
                                reject(respondeData)
                            }
                          });
                    })
                    req.write(data)
                    req.end()
                }).catch((err) => {
                    reject(err)
                })
            })
    }
}

const get = async (path)=>{
    const mode = await getCookie('mode')
    switch (mode) {
        case 'http':
            const ip = await getCookie('ip')
            const request = await r()
            return request({
                url: `${mode}://${ip}${path}`,
                method: 'get',
            })
        case 'https':
            return new Promise((resolve, reject) => {
                r().then((op) => {
                    op.path = path
                    op.method = 'GET'
                    let response = ''
                    const req = https.request(op, (res) => {
                        res.on('data', (d) => {
                            response += d.toString()
                        })
                        res.on('end', () => {
                            const respondeData = JSON.parse(response.toString())
                            if (respondeData.code === 200){
                                resolve(respondeData)  
                            }else{
                                reject(respondeData)
                            }
                          });
                    })
                    req.end()
                }).catch((err) => {
                    reject(err)
                })
            })
    }
}

const uploadFile = async (data)=>{
    const mode = await getCookie('mode')
    switch (mode) {
        case 'http':
            const ip = await getCookie('ip')
            const request = await r()
            request.interceptors.request.use(
                async config => {
                    // 在发送请求之前进行的配置
                    config.headers['Content-Type'] = 'multipart/form-data'
                    return config
                },
                error => {
                    return Promise.reject(error)
                }
            )
            let f = new FormData()
            f.append('file', data)
            const path = '/page/uploadFile'
            return request({
                url: `${mode}://${ip}${path}`,
                method: 'post',
                data: f
            })
        case 'https':
            return new Promise((resolve, reject) => {
                r().then((op) => {
                    const b = fs.readFileSync(data.path)
                    const d = JSON.stringify({
                        fileName: data.name,
                        file: JSON.parse(JSON.stringify(b)).data
                    })
                    op.path = '/page/httpsUploadFile'
                    let response = ''
                    const req = https.request(op, (res) => {
                        res.on('data', (d) => {
                            response += d.toString()
                        })
                        res.on('end', () => {
                            const respondeData = JSON.parse(response.toString())
                            if (respondeData.code === 200){
                                resolve(respondeData)  
                            }else{
                                reject(respondeData)
                            }
                          });
                    })
                    req.write(d)
                    req.end()
                }).catch((err) => {
                    reject(err)
                })
            })
    }
}

const passWordValidator = (rule, value, callback) => {
    const numberReg = /^[\d|\.]*$/  // 验证字符串是否全为数字
    const stringReg = /[0-9]/  // 验证字符串中是否含有数字
    if (numberReg.test(value)) {
        callback(new Error('密码不能全为数字'))
    }
    else if (stringReg.test(value)) {
        callback()
    }
    else {
        callback(new Error('密码不能全为字母'))
    }
}

export{
    post,
    get,
    uploadFile,
    passWordValidator
}