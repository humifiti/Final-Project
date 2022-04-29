/* eslint-disable no-shadow */
import R from '@app/assets/R'
import {
  MAIN_TAB_CUSTOMER,
  SCREEN_ROUTER,
  SCREEN_ROUTER_APP,
} from '@app/constant/Constant'
import AccountScreen from '@app/screens/App/Account/AccountScreen'
import CartScreen from '@app/screens/App/Cart/CartScreen'
import FavoriteScreen from '@app/screens/App/Favorite/FavoriteScreen'
import HomeScreen from '@app/screens/App/Home/HomeScreen'
import ProductScreen from '@app/screens/App/Product/ProductScreen'
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import reactotron from 'reactotron-react-native'
import NavigationUtil from '../NavigationUtil'
const Tab = createBottomTabNavigator()
const {
  ic_home,
  ic_cart,
  ic_profile,
  ic_profile_focus,
  ic_home_focus,
  ic_cart_focus,
  ic_favorite,
  ic_favorite_focus,
} = R.images

const { HOME, FAVORITE, CART, USER } = MAIN_TAB_CUSTOMER

const mainTabCustomer = {
  [HOME]: HomeScreen,
  [FAVORITE]: FavoriteScreen,
  [CART]: CartScreen,
  [USER]: AccountScreen,
}

const mainTabAdmin = {
  [FAVORITE]: ProductScreen,
  [CART]: CartScreen,
  [USER]: AccountScreen,
}

const MAIN_TAB = {
  [SCREEN_ROUTER.MAIN]: mainTabCustomer,
  [SCREEN_ROUTER.MAIN_ADMIN]: mainTabAdmin,
}

const tabBarIcon = {
  [HOME]: ic_home,
  [FAVORITE]: ic_favorite,
  [CART]: ic_cart,
  [USER]: ic_profile,
}

const tabBarIconFocus = {
  [HOME]: ic_home_focus,
  [FAVORITE]: ic_favorite_focus,
  [CART]: ic_cart_focus,
  [USER]: ic_profile_focus,
}

export const MainTab = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route)
  reactotron.log!('routeName', routeName)
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: false,
        tabStyle: { flexDirection: 'column' },
      }}
      tabBar={props => (
        <BottomTabBar
          {...props}
          style={{
            height: 60 + getBottomSpace(),
          }}
        />
      )}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const sizeIcon = focused ? 25 : 22
          return (
            <FastImage
              tintColor={focused ? '#FE724C' : ''}
              style={{ width: sizeIcon, height: sizeIcon }}
              source={
                focused ? tabBarIconFocus[route.name] : tabBarIcon[route.name]
              }
              resizeMode={'contain'}
            />
          )
        },
        tabBarLabel: ({ focused }) => {
          return <></>
        },
        tabBarButton: props => {
          return (
            <TouchableOpacity
              {...props}
              onPress={async e => {
                if (route.name === MAIN_TAB_CUSTOMER.CART) {
                  NavigationUtil.navigate(SCREEN_ROUTER_APP.CART)
                  return
                }
                if (props.onPress) props.onPress(e)
              }}
            />
          )
        },
      })}
    >
      {Object.keys(MAIN_TAB[route.route?.name]).map((elem, index) => (
        <Tab.Screen
          key={index}
          name={elem}
          component={MAIN_TAB[route.route?.name][elem]}
        />
      ))}
    </Tab.Navigator>
  )
}
// export const StackMainScreen = () => (
//   <Stack.Navigator
//     headerMode="none"
//     children={
//       <>
//         <Stack.Screen name={SCREEN_ROUTER.MAIN} component={MainTab} />
//       </>
//     }
//   />
// )
