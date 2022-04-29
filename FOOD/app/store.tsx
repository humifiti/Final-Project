import { configureStore } from '@reduxjs/toolkit'
import RootReducer from './screens/rootReducer'
import Reactotron from './config/ReactotronConfig'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import DebugConfig from './config/DebugConfig'

const enhancers = DebugConfig.reactotron ? [Reactotron.createEnhancer!()] : []

const store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  enhancers,
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
