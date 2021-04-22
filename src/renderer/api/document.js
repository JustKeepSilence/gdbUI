import request from '@/utils/request'
import { getCookie } from '@/utils/cookie'

const downloadFile = async (fileName) => {
    const ip = await getCookie('ip')
    return request({
        url: "http://" + ip + '/page/downloadFile/' + fileName,
        method: 'get'
    })
}

export{
    downloadFile
}