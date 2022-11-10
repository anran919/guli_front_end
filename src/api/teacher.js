import request from '@/utils/request'

// 上传讲师头像
export const uploadAvatar = process.env.VUE_APP_BASE_API + '/edu_oss/file_oss/uploadAvatar'

export function getPageList(params) {
  const { pageNo, pageSize } = params
  return request({
    url: `/service_edu/teacher/getList/${pageNo}/${pageSize}`,
    method: 'GET',
    params
  })
}
export function getAllTeacherList() {
  return request({
    url: `/service_edu/teacher/getTeacherList`,
    method: 'GET'
  })
}

export function addTeacher(data) {
  return request({
    url: '/service_edu/teacher/add',
    method: 'POST',
    data
  })
}

export function deleteTeacherById(id) {
  return request({
    url: `/service_edu/teacher/${id}`,
    method: 'DELETE'
  })
}

export function updateTeacher(id, data) {
  return request({
    url: `/service_edu/teacher/${id}`,
    method: 'PUT',
    data
  })
}

export function getTeacherById(id) {
  return request({
    url: `/service_edu/teacher/${id}`,
    method: 'GET'
  })
}
