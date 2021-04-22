/**
 * index js
 */

import request from '@/utils/request'
import { getCookie } from '@/utils/cookie'

const getDbInfo = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip +"/data/getDbInfo",
        method: "post",
        data
    })
}

const getInfoHistory = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip +"/data/getDbInfoHistory",
        method: "post",
        data
    })
}

export{
    getDbInfo,
    getInfoHistory
}