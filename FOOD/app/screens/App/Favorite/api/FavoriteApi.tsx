import { ApiClient } from '@app/service/Network/ApiService'
export default {
  getListFavoriteFood: (payload: { page: number; limit: number }) =>
    ApiClient.get(`/api/v1/favorite/food`, { params: payload }),
  getListFavoriteRest: (payload: { page: number; limit: number }) =>
    ApiClient.get(`/api/v1/favorite/rst`, { params: payload }),
}
