import { ApiClient } from '@app/service/Network/ApiService'
export default {
  getListOrderCurrent: (payload: { page: number; limit: number }) =>
    ApiClient.get(`/api/v1/order/current`, { params: payload }),
  getListOrder: (payload: { page: number; limit: number }) =>
    ApiClient.get(`/api/v1/order`, { params: payload }),
  getOrderDetail: (payload: { id: number }) =>
    ApiClient.get(`/api/v1/order/${payload.id}`, { params: {} }),
}
