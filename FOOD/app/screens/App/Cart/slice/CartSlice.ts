import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CartApi from '../api/CartApi'

const initState = {
  isError: false,
  isLoading: false,
  data: [],
  totalPrice: 0,
}

export const getListCart = createAsyncThunk('DataHomeSlice', async () => {
  const res = await CartApi.getCart()
  return res
})

const calcTotalPrice = (data: any) => {
  let total = 0
  data?.forEach((item: any) => {
    total += item.quantity * item.food.price
  })

  return total
}

const listCartSlice = createSlice({
  name: 'ListCartSlice',
  initialState: initState,
  reducers: {
    updateQuantity: (state, action) => {
      const { data } = state
      const { index, quantity } = action.payload
      let product: any = data[index]
      product.quantity = quantity
      state.totalPrice = calcTotalPrice(state.data)
    },
  },

  extraReducers: builder => {
    builder.addCase(getListCart.pending, state => {
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(getListCart.fulfilled, (state, action) => {
      state.data = action.payload?.data
      state.isLoading = false
      state.isError = false
      state.totalPrice = calcTotalPrice(state.data)
    })
    builder.addCase(getListCart.rejected, state => {
      state.isError = true
      state.isLoading = false
    })
  },
})

export const { updateQuantity } = listCartSlice.actions
export default listCartSlice.reducer
