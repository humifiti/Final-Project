import React, { Component, useEffect } from 'react'
// import { StyleSheet } from 'react-native';
// import { connect } from 'react-redux';
import AppNavigator from './app/navigation/AppNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Linking } from 'react-native'
import reactotron from '@app/config/ReactotronConfig'

// import OneSignalHelper from './app/utils/OneSignalHelper';

const AppContainer = () => {
  useEffect(() => {
    Linking.addListener('url', handleOpenUrl)
    handleDeepLinkingRequests()

    return () => {
      Linking.removeEventListener('url', handleOpenUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpenUrl = (event: { url: string }) => {
    reactotron.log!('=====', { event })
    navigate(event?.url)
  }

  const handleDeepLinkingRequests = () => {
    Linking.getInitialURL()
      .then(url => {
        reactotron.log!('======url====', url)
        if (url) navigate(url)
      })
      .catch(error => console.log(error))
  }

  const navigate = (url: any) => {
    reactotron.log!('eventDeepLink', url)
    // if (url?.includes(RESULT_VNPAY.SUCCESS)) {
    // showMessages(
    //   R.strings().notification,
    //   R.strings().recharge_success,
    //   () => {}
    // )
    //   if (url?.includes(TYPE_PRODUCT.OTHER)) {
    //     const payload = {
    //       order_status: 1,
    //       page: DEFAULT_PARAMS.PAGE,
    //       limit: DEFAULT_PARAMS.LIMIT,
    //     }
    //     Dispatch(requestListOrder(payload))
    //     NavigationUtil.navigate(SCREEN_ROUTER_APP.ORDER)
    //   } else {
    //     NavigationUtil.replace(SCREEN_ROUTER_APP.ORDER, { page: 1 })
    //   }
    // } else if (url?.includes(RESULT_VNPAY.FAILED)) {
    //   reactotron.log!('eventDeepLink-failed', url)
    //   NavigationUtil.navigate(SCREEN_ROUTER_APP.ORDER)
    //   showMessages(
    //     R.strings().notification,
    //     R.strings().recharge_fail,
    //     () => {}
    //   )
    // }
  }

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  )
}

export default AppContainer

// const mapStateToProps = state => ({});

// const mapDispatchToProps = {};
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AppContainer);

// const styles = StyleSheet.create({});
