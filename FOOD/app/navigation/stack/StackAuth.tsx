import { SCREEN_ROUTER_AUTH } from '@app/constant/Constant'
import ChangePassWordScreen from '@app/screens/Auth/ChangePassWordScreen'
import ForgotPassword from '@app/screens/Auth/ForgotPasswordScreen'
import LoginScreen from '@app/screens/Auth/LoginScreen'
import OtpScreen from '@app/screens/Auth/OtpScreen'
import RegisterScreen from '@app/screens/Auth/RegisterScreen'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

const { LOGIN, FORGOT_PASSWORD, CHANGE_PASSWORD, REGISTER, OTP } =
  SCREEN_ROUTER_AUTH
const Stack = createStackNavigator()

const mainScreen = {
  [LOGIN]: LoginScreen,
  [REGISTER]: RegisterScreen,
  [FORGOT_PASSWORD]: ForgotPassword,
  [OTP]: OtpScreen,
  [CHANGE_PASSWORD]: ChangePassWordScreen,
}

export const StackAuthScreen = () => {
  return (
    <>
      <Stack.Navigator headerMode="none">
        {Object.keys(mainScreen).map((item, index) => (
          <Stack.Screen key={index} name={item} component={mainScreen[item]} />
        ))}
      </Stack.Navigator>
    </>
  )
}
