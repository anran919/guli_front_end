import request from '@/utils/request'

export function add(data) {
  return request({
    url: `/service_edu/course/add`,
    method: 'POST',
    data
  })
}

export function updateCourse(data) {
  return request({
    url: `/service_edu/course/update`,
    method: 'PUT',
    data
  })
}

export function getCourseById(id) {
  return request({
    url: `/service_edu/course/${id}`,
    method: 'GET'
  })
}

// 上传课程封面excel
export const uploadCover = process.env.VUE_APP_BASE_API + '/edu_oss/file_oss/uploadCover'

export function getcoursePublishById(id) {
  return request({
    url: `/service_edu/course/getCoursePublish/${id}`,
    method: 'GET'
  })
}

