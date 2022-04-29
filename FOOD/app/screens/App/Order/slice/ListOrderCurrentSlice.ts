import { DEFAULT_PARAMS } from '@app/constant/Constant'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import OrderApi from '../api/OrderApi'

export type ListInsuranceType = {
  id: number
  category_id: number
  code: string
  name: string
  slug: string
  description: string
  petrol_store_id: number
  price: number
  product_media_url: string
}

type ListInsuranceSlice = {
  isError: boolean
  isLoading: boolean
  isLastPage: boolean
  isLoadMore: boolean
  data: ListInsuranceType[]
}

const initState = {
  isError: false,
  isLoading: false,
  isLastPage: false,
  isLoadMore: false,
  data: [],
}

export const getListOrderCurrent = createAsyncThunk(
  'ListOrderCurrentSlice',
  async (payload: any) => {
    const res = await OrderApi.getListOrderCurrent(payload)
    return res
  }
)
const listOrderCurrentSlice = createSlice({
  name: 'ListOrderCurrentSlice',
  initialState: initState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getListOrderCurrent.pending, (state, action) => {
      const page = action.meta.arg.page
      state.isLoading = page === DEFAULT_PARAMS.PAGE
      state.isError = false
      state.isLoadMore = page ? page > 1 : false
      state.isLastPage = false
    })
    builder.addCase(getListOrderCurrent.fulfilled, (state, action) => {
      var { page } = action.meta.arg
      const arrayCurrent = action.payload?.data
      var newState = null

      if (page === DEFAULT_PARAMS.PAGE) {
        newState = {
          isLoading: false,
          isLoadMore: false,
          isLastPage: false,
          isError: false,
          data: arrayCurrent,
        }
      } else if (arrayCurrent.length) {
        newState = {
          isLoading: false,
          isLoadMore: false,
          isLastPage: false,
          isError: false,
          data: state.data.concat(arrayCurrent),
        }
      } else {
        newState = {
          data: state.data,
          isLoading: false,
          isLoadMore: false,
          isLastPage: true,
          isError: false,
        }
      }
      return newState
    })
    builder.addCase(getListOrderCurrent.rejected, state => {
      state.isLoading = false
      state.isError = true
    })
  },
})

export const {} = listOrderCurrentSlice.actions
export default listOrderCurrentSlice.reducer
