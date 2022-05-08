import { ApiClient } from '@app/service/Network/ApiService'
import _ from 'lodash'
export default {
  getRestaurantDetail: (payload: { id: number; lat: number; lng: number }) =>
    ApiClient.get(`/api/v1/restaurant/${payload.id}`, {
      params: _.omit(payload, ['id']),
    }),
  getFoodDetail: (payload: { id: number }) =>
    ApiClient.get(`/api/v1/food/${payload.id}`, {
      params: _.omit(payload, ['id']),
    }),
  getFeaturedItem: (payload: { id: number; order_by: string }) =>
    ApiClient.get(`/api/v1/restaurant/${payload.id}/food`, {
      params: _.omit(payload, ['id']),
    }),
  getCategory: (payload: { id: number }) =>
    ApiClient.get(`/api/v1/restaurant/${payload.id}/category`, {}),
  getListFoodCategory: (payload: { id: number; category_id: number }) =>
    ApiClient.get(`/api/v1/restaurant/${payload.id}/food`, {
      params: _.omit(payload, ['id']),
    }),
  addCart: (payload: { food_id: number; quantity: number }) =>
    ApiClient.post(`/api/v1/cart`, payload),
  getReviews: (payload: { id: number }) =>
    ApiClient.get(`/api/v1/restaurant/${payload.id}/rating`, {
      params: payload,
    }),
  likeRestaurant: (payload: { id: number }) =>
    ApiClient.post(`/api/v1/restaurant/${payload.id}/like`, payload),
  unLikeRestaurant: (payload: { id: number }) =>
    ApiClient.delete(`/api/v1/restaurant/${payload.id}/unlike`, {
      params: payload,
    }),
  likeFood: (payload: { food_id: number }) =>
    ApiClient.post(`/api/v1/food/like`, payload),
  unLikeFood: (payload: { food_id: number }) =>
    ApiClient.delete(`/api/v1/food/unlike`, {
      params: payload,
    }),
}
