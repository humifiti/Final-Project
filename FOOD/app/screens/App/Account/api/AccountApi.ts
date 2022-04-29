import { ApiClient } from '@app/service/Network/ApiService'
import _ from 'lodash'
export default {
  getUserInfo: () => ApiClient.get(`/api/v1/my-profile`, { params: {} }),
  uploadFile: (payload: {}) => ApiClient.post(`/api/v1/upload`, payload),
  updateProfile: (payload: any) => ApiClient.put(`/api/v1/my-profile`, payload),
  //   createAddress: (payload: {
  //     city_id: number
  //     address: string
  //     lat: number
  //     lng: number
  //     name: string
  //     phone: string
  //     is_default: boolean
  //   }) => ApiClient.post(`/api/v1/address`, payload),
  //   updateAddress: (payload: {
  //     city_id: number
  //     address: string
  //     lat: number
  //     lng: number
  //     name: string
  //     phone: string
  //     is_default: boolean
  //     address_id: number
  //   }) =>
  //     ApiClient.put(
  //       `/api/v1/address/${payload.address_id}`,
  //       _.omit(payload, ['address_id'])
  //     ),
  //   getListAddress: () => ApiClient.get(`/api/v1/address`, { params: {} }),
  //   getAddressDefault: () =>
  //     ApiClient.get(`/api/v1/address/default`, { params: {} }),
}
