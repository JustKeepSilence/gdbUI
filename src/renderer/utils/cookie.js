/**
 * 读写cookie,使用的是js-cookie
 * https://github.com/js-cookie/js-cookie
 */

import { Message } from 'element-ui'
// import {session} from '@electron/remote'
// const {session} = require('@electron/remote')
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
    session.defaultSession.cookies.set(cookie).then(()=>{
      resolve()
    }).catch(err=>{
      Message({
        message: '设置cookie失败: ' + err,
        type: 'error'
      })
    })
  })
}

const getCookie = (key) => {
  return new Promise((resolve, reject) => {
    session.defaultSession.cookies.get({name: key}).then((cookies)=>{
      if (cookies.length > 0) {
        resolve(cookies[0].value)
      } else {
        if (key === 'token') {
          resolve('')
        } else {
          reject(`cookie字段${key}不存在`)
        }
      }
    }).catch(err=>{
        reject(err)
    })
    
  })
}

const removeCookie = (key) => {
  return new Promise((resolve, reject) => {
    session.defaultSession.clearStorageData({ name: key, storages: ['cookies'] }).then(()=>{
      resolve()
    }).catch(err=>{
      Message({
        message: '清除cookie失败,' + error,
        type: 'error'
      })
      reject(error)
    })
  })
}

export {
  setCookie,
  getCookie,
  removeCookie
}
