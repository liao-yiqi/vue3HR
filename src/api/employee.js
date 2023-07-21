import request from '@/utils/request'

export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

export function getEmployeeDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
