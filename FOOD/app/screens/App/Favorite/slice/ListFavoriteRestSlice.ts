import { DEFAULT_PARAMS } from '@app/constant/Constant'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import FavoriteApi from '../api/FavoriteApi'

const initState = {
  isError: false,
  isLoading: false,
  isLastPage: false,
  isLoadMore: false,
  data: [],
}

export const getListFavoriteRest = createAsyncThunk(
  'ListFavoriteRestSlice',
  async (payload: any) => {
    const res = await FavoriteApi.getListFavoriteRest(payload)
    return res
  }
)
const listFavoriteRestSlice = createSlice({
  name: 'ListOrderCurrentSlice',
  initialState: initState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getListFavoriteRest.pending, (state, action) => {
      const page = action.meta.arg.page
      state.isLoading = page === DEFAULT_PARAMS.PAGE
      state.isError = false
      state.isLoadMore = page ? page > 1 : false
      state.isLastPage = false
    })
    builder.addCase(getListFavoriteRest.fulfilled, (state, action) => {
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
    builder.addCase(getListFavoriteRest.rejected, state => {
      state.isLoading = false
      state.isError = true
    })
  },
})

export const {} = listFavoriteRestSlice.actions
export default listFavoriteRestSlice.reducer
