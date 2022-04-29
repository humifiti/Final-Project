import R from '@app/assets/R'
import reactotron from '@app/config/ReactotronConfig'
import { API_STATUS, SCREEN_ROUTER } from '@app/constant/Constant'
import { ResponseType } from '@app/service/Network/model/ApiResponse'
import store from '@app/store'
import { showMessages } from '@app/utils/AlertHelper'
import AsyncStoreService from '../AsyncStorage/AsyncStorageService'
// import NavigationUtil from '@app/navigation/NavigationUtil';
const BASE_URL_DEV = 'https://foodlive.tech'

const createAPI = () => {
  const APIInstant = require('axios').default.create()
  APIInstant.defaults.baseURL = BASE_URL_DEV
  APIInstant.defaults.timeout = 20000
  APIInstant.defaults.headers = { 'Content-Type': 'application/json' }
  APIInstant.interceptors.request.use(async (config: any) => {
    config.headers.Authorization = `Bearer ${(config.headers.Authorization =
      await AsyncStoreService.getToken())}`
    // config.headers.Authorization = await AsyncStoreService.getToken()
    return config
  }, Promise.reject)

  APIInstant.interceptors.response.use(
    (response: ResponseType<any>) => {
      return response
    },
    async (error: any) => {
      reactotron.log!('error', error)
      if (error.message === 'Network Error') return

      const data = await error?.response?.data
      if (data && data.code === API_STATUS.UNAUTHORIZED) {
        // showMessages(R.strings().notification, R.strings().re_login)
        AsyncStoreService.putToken('').then(() => {
          store.dispatch({
            type: 'switch/navigateSwitch',
            payload: SCREEN_ROUTER.AUTH,
          })
        })
      } else if (data && data.code !== API_STATUS.UNAUTHORIZED) {
        if (data.message !== 'Phone number was not activated') {
          if (data.message !== 'Foods need to be in the same restaurant') {
            showMessages(R.strings().notification, data.message)
          }
        }
      }
      return Promise.reject(error)
    }
  )
  return APIInstant
}

const axiosClient = createAPI()

/* Support function */
function handleResult<T>(api: any) {
  // if (NetworkHelper.isInternetReachable) {
  return api.then((res: any) => {
    return handleResponse<T>(res.data)
  })
  // } else Promise.reject(new Error('Network offline'));
}

function handleResponse<T>(data: ResponseType<T>) {
  if (!data) return Promise.reject(new Error(data?.message || 'Co loi xay ra'))
  return Promise.resolve(data)
}

export const ApiClient = {
  get: (url: string, payload: any) =>
    handleResult(axiosClient.get(url, payload)),
  post: (url: string, payload: any) =>
    handleResult(axiosClient.post(url, payload)),
  put: (url: string, payload: any) =>
    handleResult(axiosClient.put(url, payload)),
  path: (url: string, payload: any) =>
    handleResult(axiosClient.patch(url, payload)),
  delete: (url: string, payload: any) =>
    handleResult(axiosClient.delete(url, payload)),
}
