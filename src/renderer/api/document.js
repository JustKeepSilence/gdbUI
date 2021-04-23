import {r} from '@/utils/request'
import { getCookie } from '@/utils/cookie'

const downloadFile = async (fileName) => {
    const ip = await getCookie('ip')
    const request = await r()
    return request({
        url: "http://" + ip + '/page/downloadFile/' + fileName,
        method: 'get'
    })
}

export{
    downloadFile
}