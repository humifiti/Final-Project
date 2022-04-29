import { ApiClient } from '@app/service/Network/ApiService'
import {
  ActivePayload,
  LoginPayload,
  RegisterPayload,
} from '@app/service/Network/model/ApiPayload'
export default {
  register: (payload: RegisterPayload) =>
    ApiClient.post(`/api/v1/register`, payload),
  login: (payload: LoginPayload) => ApiClient.post(`/api/v1/login`, payload),
  loginAdmin: (payload: LoginPayload) =>
    ApiClient.post(`/api/v1/owner-restaurant/login`, payload),
  active: (payload: ActivePayload) =>
    ApiClient.post(`/api/v1/activate`, payload),
  resendOtp: (payload: { phone: string }) =>
    ApiClient.post(`/api/v1/resend_otp_active`, payload),
}
