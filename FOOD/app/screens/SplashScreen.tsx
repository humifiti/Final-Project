import { APP_SLICE, SCREEN_ROUTER } from '@app/constant/Constant'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import React, { useEffect } from 'react'
import { Button, Text, View } from 'react-native'
import { connect } from 'react-redux'

const SplashScreen = (props: any) => {
  useEffect(() => {
    handleNavigate()
  }, [])

  const handleNavigate = async () => {
    const token = await AsyncStorageService.getToken()
    if (token) {
      props.navigateSwitch(SCREEN_ROUTER.MAIN)
    } else {
      props.navigateSwitch(SCREEN_ROUTER.AUTH)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
        backgroundColor: '#3892',
      }}
    >
      <Text style={{ marginBottom: 50 }}>SPLASH</Text>

      <Button
        onPress={() => {
          props.navigateSwitch(SCREEN_ROUTER.MAIN)
        }}
        title="CUSTOMER"
      />
    </View>
  )
}

const mapStateToProps = (state: any) => ({
  switch: state[APP_SLICE.SWITCH].switch,
})

const mapDispatchToProps = {
  navigateSwitch,
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
