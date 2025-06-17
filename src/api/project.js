import request from '@/utils/request'

export const getProjectAll = () =>{
    return request({
        url:"/project/all",
        method:'GET'
    })
}