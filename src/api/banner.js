import request from '@/utils/request'
export function getBannerPageList(params) {
  const { pageNo, pageSize } = params
  return request({
    url: `/service_cms/banner/${pageNo}/${pageSize}`,
    method: 'GET',
    params
  })
}

export function deleteBannerById(id) {
  return request({
    url: `/service_cms/banner/delete/${id}`,
    method: 'DELETE'
  })
}

export function addBanner(data) {
  return request({
    url: `/service_cms/banner/add`,
    method: 'POST',
    data
  })
}

export function updateBanner(data) {
  return request({
    url: `/service_cms/banner/update`,
    method: 'PUT',
    data
  })
}

export function getBannerById(id) {
  return request({
    url: `/service_cms/banner/${id}`,
    method: 'GET'
  })
}
