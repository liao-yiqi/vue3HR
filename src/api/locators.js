import request from '@/utils/request'

export const getLocatorsAPI = (params) => {
  return request({
    url: `/ui/elementrepo/locator/`,
    method: 'GET',
    params
  })
}
