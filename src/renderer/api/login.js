/**
 * 登陆时候的密码表单规则验证
 * 验证的规则为用户输入的密码必须得包含数字和字母的组合
 */

import { r } from '@/utils/request'
import { getCookie } from '@/utils/cookie'
const https = require('https')

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

/**
 * 验证用户登陆，返回用户的token
 */

const userLogin = async (data) => {
    const mode = await getCookie('mode')
    switch (mode) {
        case 'http':
            const ip = await getCookie('ip')
            const request = await r()
            return request({
                url: `${mode}://` + ip + '/page/userLogin',
                method: 'post',
                data
            })
            break;
        case 'https':
            return new Promise((resolve, reject) => {
                r().then((op) => {
                    op.path = '/page/userLogin'
                    const req = https.request(op, (res) => {
                        res.on('data', (data) => {
                            resolve(data.toString())
                        })
                    })
                    req.write(data)
                    req.end()
                }).catch((err) => {
                    reject(err)
                })
            })
    }

}

// /page/getUserInfo
const getUserRole = async (data) => {
    const mode = await getCookie('mode')
    switch (mode) {
        case 'http':
            const ip = await getCookie('ip')
            const request = await r()
            return request({
                url: `${mode}://` + ip + '/page/getUserInfo',
                method: 'post',
                data
            })
            break;
        case 'https':
            return new Promise((resolve, reject) => {
                r().then((op) => {
                    op.path = '/page/getUserInfo'
                    const req = https.request(op, (res) => {
                        res.on('data', (data) => {
                            resolve(data.toString())
                        })
                    })
                    req.write(data)
                    req.end()
                }).catch((err) => {
                    reject(err)
                })
            })
    }
}

// page/userLogout/
const userLogOut = async (userName) => {
    const mode = await getCookie('mode')
    switch (mode) {
        case 'http':
            const ip = await getCookie('ip')
            const request = await r()
            return request({
                url: `${mode}://` + ip + '/page/userLogout',
                method: 'post',
                data
            })
            break;
        case 'https':
            return new Promise((resolve, reject) => {
                r().then((op) => {
                    op.path = '/page/userLogout'
                    const req = https.request(op, (res) => {
                        res.on('data', (data) => {
                            resolve(data.toString())
                        })
                    })
                    req.write(data)
                    req.end()
                }).catch((err) => {
                    reject(err)
                })
            })
    }
}


export {
    passWordValidator,
    userLogin,
    getUserRole,
    userLogOut
}
