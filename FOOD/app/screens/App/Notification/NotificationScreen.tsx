import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import React from 'react'
import { Text } from 'react-native'

const NotificationScreen = () => {
  return (
    <ScreenWrapper
      back
      titleHeader="Noti"
      backgroundColor="red"
      children={
        <>
          <Text>Hello</Text>
        </>
      }
    />
  )
}

export default NotificationScreen
