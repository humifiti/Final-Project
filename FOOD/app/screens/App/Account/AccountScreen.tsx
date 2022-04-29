import R from '@app/assets/R'
import FstImage from '@app/components/FstImage/FstImage'
import { SCREEN_ROUTER } from '@app/constant/Constant'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import { useAppSelector } from '@app/store'
import { colors, fonts } from '@app/theme'
import React, { useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useDispatch } from 'react-redux'
import BodyAccountScreen from './components/BodyAccountScreen'
import NameUser from './components/NameUser'

const AccountScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <SafeAreaView style={styles.v_container}>
      <ScrollView
        style={styles.v_container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ctn}>
          <NameUser />
          <BodyAccountScreen />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorageService.putToken('')
          dispatch(navigateSwitch(SCREEN_ROUTER.AUTH))
        }}
        style={styles.v_button}
      >
        <FstImage style={styles.ic_log_out} source={R.images.ic_log_out} />
        <Text style={styles.txt_log_out}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  v_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ctn: {
    flex: 1,
    marginBottom: 50,
  },
  v_button: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginBottom: 50,
    borderRadius: 28.5,
    paddingVertical: 9,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt_log_out: {
    ...fonts.regular16,
    color: 'white',
    fontWeight: '500',
  },
  ic_log_out: {
    width: 26,
    height: 26,
    marginRight: 9,
  },
})

export default AccountScreen
