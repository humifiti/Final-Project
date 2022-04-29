import { ApiClient } from '@app/service/Network/ApiService'
export default {
  getCart: () => ApiClient.get(`/api/v1/cart`, { params: {} }),
  updateCart: (payload: { food_id: number; quantity: number }) =>
    ApiClient.put(`/api/v1/cart`, payload),
  deleteCart: (payload: { food_id: number }) =>
    ApiClient.delete(`/api/v1/cart/food/${payload.food_id}`, {}),
  preCheckOut: (payload: { address_id: number }) =>
    ApiClient.get(`/api/v1/order/preview`, { params: payload }),
  checkOutByMomo: (payload: { user_addr_id: number }) =>
    ApiClient.post(`/api/v1/order/momo`, payload),
  deleteCartAll: () => ApiClient.delete(`/api/v1/cart`, {}),
  checkOutByCrypto: (payload: { user_addr_id: number }) =>
    ApiClient.post(`/api/v1/order/crypto`, payload),
}
