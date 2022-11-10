import request from '@/utils/request'

export function add(data) {
  return request({
    url: `/service_edu/course/add`,
    method: 'POST',
    data
  })
}

// 上传课程封面excel
export const uploadCover = process.env.VUE_APP_BASE_API + '/edu_oss/file_oss/uploadCover'

