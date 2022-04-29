import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import AddNewAddress from '@app/screens/App/Account/AddNewAddress'
import ChangePassWordScreen from '@app/screens/App/Account/ChangePass'
import DeliveryAddress from '@app/screens/App/Account/DeliveryAddress'
import UpdateInfoUser from '@app/screens/App/Account/UpdateInfoUser'
import CartScreen from '@app/screens/App/Cart/CartScreen'
import CheckOutScreen from '@app/screens/App/Cart/CheckOutScreen'
import SearchScreen from '@app/screens/App/Home/SearchScreen'
import OrderDetailScreen from '@app/screens/App/Order/OrderDetailScreen'
import OrderScreen from '@app/screens/App/Order/OrderScreen'
import FoodDetail from '@app/screens/App/Product/FoodDetail'
import RestaurantDetail from '@app/screens/App/Product/RestaurantDetail'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

const {
  SEARCH,
  FOOD_DETAIL,
  RESTAURANT_DETAIL,
  ORDER,
  UPDATE_USER_INFO,
  DELIVERY_ADDRESS,
  ADD_ADDRESS,
  CHANGE_PASS,
  CART,
  CHECKOUT,
  ORDER_DETAIL,
} = SCREEN_ROUTER_APP
const Stack = createStackNavigator()

const mainScreen = {
  [SEARCH]: SearchScreen,
  [FOOD_DETAIL]: FoodDetail,
  [RESTAURANT_DETAIL]: RestaurantDetail,
  [ORDER]: OrderScreen,
  [UPDATE_USER_INFO]: UpdateInfoUser,
  [DELIVERY_ADDRESS]: DeliveryAddress,
  [ADD_ADDRESS]: AddNewAddress,
  [CHANGE_PASS]: ChangePassWordScreen,
  [CART]: CartScreen,
  [CHECKOUT]: CheckOutScreen,
  [ORDER_DETAIL]: OrderDetailScreen,
}

export const StackAppCustomerScreen = () => {
  return (
    <>
      {Object.keys(mainScreen).map((item, index) => (
        <Stack.Screen key={index} name={item} component={mainScreen[item]} />
      ))}
    </>
  )
}
