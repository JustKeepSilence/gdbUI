/**
 * 读写cookie,使用的是js-cookie
 * https://github.com/js-cookie/js-cookie
 */

import { Message } from 'element-ui'

const session = require('electron').remote.session

const setCookie = ({ key, value }) => {
    const days = 1
    const now = new Date()
    const expirationDate = Math.round(now.getTime() / 1000) + days * 24 * 60 * 60
    const cookie = {
        url: `http://www.${key}.com`,
        name: key,
        value,
        expirationDate
    }
    return new Promise((resolve, reject) => {
        session.defaultSession.cookies.set(cookie, (error) => {
            if (error) {
                Message({
                    message: '设置cookie失败: ' + error,
                    type: 'error'
                })
                reject(error)
            } else {
                resolve()
            }
        })
    })

}

const getCookie = (key) => {
    return new Promise((resolve, reject) => {
        session.defaultSession.cookies.get({ name: key }, (error, cookies) => {
            if (error) {
                reject(error)
            } else {
                if (cookies.length > 0) {
                    resolve(cookies[0].value)
                } else {
                    if(key === 'token'){
                        resolve('')
                    }else{
                    reject(`cookie字段${key}不存在`)
                }
                }
            }

        })
    })
}

const removeCookie = (key) => {
    return new Promise((resolve, reject) => {
        session.defaultSession.clearStorageData({ name: key, storages: ['cookies'] },
            (error) => {
                if (error) {
                    Message({
                        message: '清除cookie失败,' + error,
                        type: 'error'
                    })
                    reject(error)
                } else {
                    resolve()
                }
            })
    })

}

export {
    setCookie,
    getCookie,
    removeCookie
}