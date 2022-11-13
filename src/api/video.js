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

export function deleteVideoById(id) {
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

/**
 *
 * @param {阿里云视频的id} id
 * @returns 删除promise
 */
export function deleteAliVideoByVideoId(id) {
  return request({
    url: `/service_vod/video/${id}`,
    method: 'DELETE'
  })
}

// 上传小节视频
export const uploadVideo = process.env.VUE_APP_BASE_API + '/service_vod/video/upload'

