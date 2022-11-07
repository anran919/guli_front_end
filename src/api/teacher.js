import request from '@/utils/request'

export function getPageList(params) {
  // const { page, limit } = params
  return request({
    url: `/edu_service/edu_teacher/getTeacherList`,
    method: 'GET',
    params
  })
}

export function addTeacher(data) {
  return request({
    url: '/edu_service/edu_teacher/add',
    method: 'POST',
    data
  })
}
