import request from '@/utils/request'

export function getVideoListByChapterId(chapterId) {
  return request({
    url: `/service_edu/video/list/${chapterId}`,
    method: 'GET'
  })
}

export function addVideo(data) {
  return request({
    url: `/service_edu/video/add`,
    method: 'POST',
    data
  })
}

export function deleteVideo(id) {
  return request({
    url: `/service_edu/video/${id}`,
    method: 'DELETE'
  })
}

export function updateVideo(data) {
  return request({
    url: `/service_edu/video/upate`,
    method: 'PUT',
    data
  })
}

export function getVideoById(id) {
  return request({
    url: `/service_edu/video/${id}`,
    method: 'GET'
  })
}

