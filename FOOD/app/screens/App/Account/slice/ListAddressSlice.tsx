import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AddressApi from '../api/AddressApi'

const initState = {
  isError: false,
  isLoading: false,
  data: [],
}

export const getListAddress = createAsyncThunk('ListAddressSlice', async () => {
  const res = await AddressApi.getListAddress()
  return res
})

const listAddressSlice = createSlice({
  name: 'ListAddressSlice',
  initialState: initState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getListAddress.pending, state => {
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(getListAddress.fulfilled, (state, action) => {
      state.data = action.payload?.data
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(getListAddress.rejected, state => {
      state.isError = true
      state.isLoading = false
    })
  },
})

export const {} = listAddressSlice.actions
export default listAddressSlice.reducer
