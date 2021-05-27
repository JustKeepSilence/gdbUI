/**
 * index js
 */

import { r } from '@/utils/request'
import { getCookie } from '@/utils/cookie'
import { Base64 } from 'js-base64'
const https = require('https')
const fs = require('fs')
const path = require('path')
const grpc = require('grpc')
const async = require('async')

let services = null
const maxSize = 4194304  // 4M
const step = 1024 * 1024 * 2
let cert = null
let key = null
if (process.env.NODE_ENV === 'development') {
  const proto = grpc.load(path.join(process.cwd(), '/model/gdb.proto'))
  cert = fs.readFileSync(path.join(process.cwd(), '/model/ssl/gdbServer.crt'))
  key = fs.readFileSync(path.join(process.cwd(), '/model/ssl/gdbServer.key'))
  services = proto.model
} else {
  const proto = grpc.load(path.join(process.cwd(), 'resources/model/gdb.proto'))
  cert = fs.readFileSync(path.join(process.cwd(), 'resources/model/ssl/gdbServer.crt'))
  key = fs.readFileSync(path.join(process.cwd(), 'resources/model/ssl/gdbServer.key'))
  services = proto.model
}


/**
 * send post request
 * @param {*} data : post body data
 * @param {*} path : url path
 */
const post = async (data, path) => {
  const mode = await getCookie('mode')
  const ip = await getCookie('ip')
  switch (mode) {
    case 'http':
      const request = await r()
      return request({
        url: `${mode}://${ip}${path}`,
        method: 'post',
        data
      })
    case 'https':
      return new Promise((resolve, reject) => {
        let response = ''
        r().then((op) => {
          op.path = path
          const req = https.request(op, (res) => {
            res.on('data', (d) => {
              response += d.toString()
            })
            res.on('end', () => {
              const respondeData = JSON.parse(response.toString())
              if (respondeData.code === 200) {
                resolve(respondeData)
              } else {
                reject(respondeData)
              }
            })
          })
          req.write(JSON.stringify(data))
          req.end()
        }).catch((err) => {
          reject(err)
        })
      })
    default:
      let client = null
      const url = ip
      const userToken = await getCookie('token')
      let userName = ''
      let token = ''
      if (userToken) {
        userName = await getCookie('userName')
        token = 'Basic ' + Base64.encode(`${userName}:${userToken}`)
      }
      const san = mode.indexOf('https') > -1 ? await getCookie('san') : ''
      const option = mode.indexOf('https') > -1 ? { 'grpc.ssl_target_name_override': san, 'grpc.default_authority': san } : {}
      const credentials = mode.indexOf('https') > -1 ? grpc.credentials.createSsl(cert) : grpc.credentials.createInsecure()
      const p = path.split('/')
      switch (p[1]) {
        case 'page':
          client = new services.Page(url, credentials, option)
          break;
        case 'item':
          client = new services.Item(url, credentials, option)
          break;
        case 'data':
          client = new services.Data(url, credentials, option)
          break;
        case 'calculation':
          client = new services.Calc(url, credentials, option)
          break;
        default:
          client = new services.Group(url, credentials, option)
          break;
      }
      const metaData = new grpc.Metadata()
      metaData.add('Authorization', token)
      return new Promise((resolve, reject) => {
        client[p[2]](data, metaData, (err, response) => {
          return err === null ? resolve({ data: response }) : reject({ message: err.details })
        })
      })
  }
}

const uploadFile = async (data) => {
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
              if (respondeData.code === 200) {
                resolve(respondeData)
              } else {
                reject(respondeData)
              }
            })
          })
          req.write(d)
          req.end()
        }).catch((err) => {
          reject(err)
        })
      })
    default:
      return new Promise(async (resolve, reject) => {
        const ip = await getCookie('ip')
        const url = 'dns:' + ip
        const userToken = await getCookie('token')
        let userName = ''
        let token = ''
        if (userToken) {
          userName = await getCookie('userName')
          token = 'Basic ' + Base64.encode(`${userName}:${userToken}`)
        }
        const b = fs.readFileSync(data.path)
        const file = JSON.parse(JSON.stringify(b)).data
        const d = {
          fileName: data.name,
          file
        }
        const metaData = new grpc.Metadata()
        metaData.add('Authorization', token)
        const san = mode.indexOf('https') > -1 ? await getCookie('san') : ''
        const option = mode.indexOf('https') > -1 ? { 'grpc.ssl_target_name_override': san, 'grpc.default_authority': san } : {}
        const credentials = mode.indexOf('https') > -1 ? grpc.credentials.createSsl(cert) : grpc.credentials.createInsecure()
        const client = new services.Page(url, credentials, option)
        if (file.length > maxSize) {
          // stream
          const call = client.uploadFileWithStream(metaData, (err, response) => {
            return err === null ? resolve({ data: response }) : reject({ message: err.details })
          })
          function fileSender(name, content) {
            return function (callback) {
              call.write({
                fileName: name,
                file: content
              })
              callback(null, '')
            }
          }
          let fsr = []
          const count = parseInt(file.length / step)
          for (let i = 0; i < count; i++) {
            fsr[i] = fileSender(data.name, sliceArray(i * step, (i + 1) * step, file))
          }
          fsr[count] = fileSender(data.name, sliceArray(count * step, file.length, file))
          async.series(fsr, () => {
            call.end()
          })
        } else {
          // you can also set {'grpc.max_send_message_length': 1024 * 1024 * 100}
          client.uploadFile(d, metaData, (err, response) => {
            return err === null ? resolve({ data: response }) : reject({ message: err.details })
          })
        }
      })
  }
}

const passWordValidator = (rule, value, callback) => {
  const numberReg = /^[\d|\.]*$/ // 验证字符串是否全为数字
  const stringReg = /[0-9]/ // 验证字符串中是否含有数字
  if (numberReg.test(value)) {
    callback(new Error('密码不能全为数字'))
  } else if (stringReg.test(value)) {
    callback()
  } else {
    callback(new Error('密码不能全为字母'))
  }
}

function sliceArray(start, end, data) {
  if (start > end || end > data.length) {
    throw Error('invalid length')
  }
  let r = []
  for (let i = start; i < end; i++) {
    r.push(data[i])
  }
  return r
}

export {
  post,
  uploadFile,
  passWordValidator
}
