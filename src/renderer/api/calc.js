import {r} from '@/utils/request'
import { getCookie } from '@/utils/cookie'


const addCalulationItems = async (data)=>{
    const ip = await getCookie('ip')
    const request = await r()
    return request({
        url: "http://" + ip +'/calculation/addCalcItem',
        method: 'post',
        data
    })
}

const getCalculationItems = async (data)=>{
    const ip = await getCookie('ip')
    const request = await r()
    return request({
        url: "http://" + ip +'/calculation/getCalcItem',
        method:'post',
        data
    })
}

const updateCalculationItems = async (data)=>{
    const ip = await getCookie('ip')
    const request = await r()
    return request({
        url : "http://" + ip +'/calculation/updateCalcItem',
        method: 'post',
        data
    })
}

const getReCalc = async (data)=>{
    const ip = await getCookie('ip')
    const request = await r()
    return request({
        url: "http://" + ip +'/calculation/getReCalc',
        method: "post",
        data
    })
}

export{
    addCalulationItems,
    getCalculationItems,
    updateCalculationItems,
    getReCalc
}