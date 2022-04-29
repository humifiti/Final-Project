import { ApiClient } from '@app/service/Network/ApiService'
export default {
  getCategory: () => ApiClient.get(`/api/v1/category`, { params: {} }),
  getRestaurant: (payload: { category: number; lat: number; lng: number }) =>
    ApiClient.get(`/api/v1/restaurant`, { params: payload }),
  getFood: (payload: { order_by: string }) =>
    ApiClient.get(`/api/v1/food/all`, { params: payload }),
  searchFood: (payload: { name: string }) =>
    ApiClient.get(`/api/v1/food/all`, { params: payload }),
  searchRest: (payload: { name: string }) =>
    ApiClient.get(`/api/v1/restaurant`, { params: payload }),
}
