import request from '@/utils/request'

export const getElementByPageIdAPI = (id) => {
  return request({
    url: `/ui/elementrepo/element/page/${id}`,
    method: 'GET',
  })
}
