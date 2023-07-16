import request from '@/utils/request'
// 获取角色列表
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
// 删除角色
export function delRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
// 新增角色
export function addRole(data) {
  return request({
    url: `/sys/role`,
    data,
    method: 'post'
  })
}
// 更新角色
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}
// 根据id获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 获取公司数据
export function getCompanyInfo() {
  return request({
    url: `/company`
  })
}
