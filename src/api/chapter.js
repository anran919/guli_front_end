import request from '@/utils/request'

export function getChapterList(courseId) {
  return request({
    url: `/service_edu/chapter/nested_list/${courseId}`,
    method: 'GET'
  })
}

export function addChapter(data) {
  return request({
    url: `/service_edu/chapter/add`,
    method: 'POST',
    data
  })
}

export function updateChapter(data) {
  return request({
    url: `/service_edu/chapter/update`,
    method: 'PUT',
    data
  })
}

export function deleteChapterById(id) {
  return request({
    url: `/service_edu/chapter/${id}`,
    method: 'DELETE'
  })
}

export function getChapterById(id) {
  return request({
    url: `/service_edu/chapter/${id}`,
    method: 'GET'
  })
}

