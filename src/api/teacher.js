import request from '@/utils/request'

export function getPageList(params) {
  const { pageNo, pageSize } = params
  return request({
    url: `/service_edu/edu_teacher/getList/${pageNo}/${pageSize}`,
    method: 'GET',
    params
  })
}

export function addTeacher(data) {
  return request({
    url: '/service_edu/edu_teacher/add',
    method: 'POST',
    data
  })
}

export function deleteTeacherById(id) {
  return request({
    url: `/service_edu/edu_teacher/${id}`,
    method: 'DELETE'
  })
}

export function updateTeacher(id, data) {
  return request({
    url: `/service_edu/edu_teacher/${id}`,
    method: 'PUT',
    data
  })
}

export function getTeacherById(id) {
  return request({
    url: `/service_edu/edu_teacher/${id}`,
    method: 'GET'
  })
}
