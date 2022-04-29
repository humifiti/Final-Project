import React from 'react'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import NotificationScreen from '@app/screens/App/Notification/NotificationScreen'
import ProductScreen from '@app/screens/App/Product/ProductScreen'
import { createStackNavigator } from '@react-navigation/stack'

const { PRODUCT, NOTIFICATION } = SCREEN_ROUTER_APP
const Stack = createStackNavigator()

const mainScreen = {
  [PRODUCT]: ProductScreen,
  [NOTIFICATION]: NotificationScreen,
}

export const StackAppAdminScreen = () => {
  return (
    <>
      {Object.keys(mainScreen).map((item, index) => (
        <Stack.Screen key={index} name={item} component={mainScreen[item]} />
      ))}
    </>
  )
}
