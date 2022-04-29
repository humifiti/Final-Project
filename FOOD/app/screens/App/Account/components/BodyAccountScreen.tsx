import R from '@app/assets/R'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors } from '@app/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import RowBody from './RowBody'

const BodyAccountScreen = () => {
  return (
    <View style={styles.v_body}>
      <RowBody
        img={R.images.ic_edit_user}
        title={'My profile'}
        action={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.UPDATE_USER_INFO)
        }}
      />
      <RowBody
        img={R.images.img_order}
        title={'My Orders'}
        action={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.ORDER)
        }}
      />
      <RowBody
        img={R.images.ic_address}
        title={'Delivery Address'}
        action={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.DELIVERY_ADDRESS, {
            isAccountScreen: true,
          })
        }}
      />

      <RowBody
        img={R.images.img_change_pass}
        title={R.strings().change_password}
        action={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.CHANGE_PASS)
        }}
      />
    </View>
  )
}
export default BodyAccountScreen

const styles = StyleSheet.create({
  v_body: {
    marginTop: 1,
    backgroundColor: colors.white,
  },
})
