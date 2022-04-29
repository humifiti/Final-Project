import { createSlice } from '@reduxjs/toolkit'
export type LocationType = {
  lat: number
  long: number
}

const initState: LocationType = {
  lat: 0,
  long: 0,
}

const locationSlice = createSlice({
  name: 'LocationSlice',
  initialState: initState,
  reducers: {
    updateLocation: (state, action) => {
      state = { ...state, ...action.payload }
      return state
    },
  },
})

export const { updateLocation } = locationSlice.actions
export default locationSlice.reducer
