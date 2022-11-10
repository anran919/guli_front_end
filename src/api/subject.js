import request from '@/utils/request'

export function getTreeList() {
  return request({
    url: `/service_edu/subject/getTreeList`,
    method: 'GET'
  })
}

// 上传课程分类excel
export const uploadFile = process.env.VUE_APP_BASE_API + '/service_edu/subject/uploadFile'
