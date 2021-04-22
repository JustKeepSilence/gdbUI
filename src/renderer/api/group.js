/**
 * 和group相关的请求
 */

import request from '@/utils/request'
import { getCookie } from '@/utils/cookie'

const getGroups = async ()=>{
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip +"/group/getGroups",
        method: "post",
    })
}

const addGroups = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip +'/group/addGroups',
        method: 'post',
        data
    })
}

const getGroupColumns = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip +'/group/getGroupProperty',
        method: 'post',
        data
    })
}

const addItem = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip +'/item/addItems',
        method: 'post',
        data
    })
}

const deleteGroup = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip +'/group/deleteGroups',
        method: 'post',
        data
    })
}

const getItems = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url : "http://" + ip +"/item/getItemsWithCount",
        method: 'post',
        data
    })
}

const getRealTimeData = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip +'/data/getRealTimeData',
        method: 'post',
        data
    })
}

const addItemsByExcel = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip +'/page/addItemsByExcel',
        method:'post',
        data
    })
}

const getHistoryData = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url :"http://" + ip +'/data/getHistoricalData',
        method: 'post',
        data
    })
}

const updateColumnNames = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip +'/group/updateGroupColumnNames',
        method: 'post',
        data
    })
}

const addColumns = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip +'/group/addGroupColumns',
        method: 'post',
        data
    })
}

const deleteColumns = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip +'/group/deleteGroupColumns',
        method: 'post',
        data
    })
}

const updateItems = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip +'/item/updateItems',
        method: 'post',
        data
    })
}

const deleteItems = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip +'/item/deleteItems',
        method: 'post',
        data
    })
}

const cleanGroupItems = async (data)=>{
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip +'/group/cleanGroupItems',
        method: 'post',
        data
    })
}

const checkItems = async(data)=>{
    const ip = await getCookie('ip')
    return request({
        url: 'http://' + ip + '/item/checkItems',
        method: 'post',
        data
    })
}

const importHistory = async(data)=>{
    const ip = await getCookie('ip')
    return request({
        url: 'http://' + ip + '/page/importHistoryByExcel',
        method: 'post',
        data
    })
}

export{
    getGroups,
    addGroups,
    getGroupColumns,
    addItem,
    deleteGroup,
    getItems,
    getRealTimeData,
    addItemsByExcel,
    getHistoryData,
    updateColumnNames,
    addColumns,
    deleteColumns,
    updateItems,
    deleteItems,
    cleanGroupItems,
    checkItems,
    importHistory
}
