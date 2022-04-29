import R from '@app/assets/R'
import Card from '@app/components/Card'
import FstImage from '@app/components/FstImage/FstImage'
import RNButton from '@app/components/RNButton'
import RNTextInput from '@app/components/RNTextInput'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { SCREEN_ROUTER, SCREEN_ROUTER_AUTH } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import { colors } from '@app/theme'
import React, { useRef, useState } from 'react'
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { CheckBox } from 'react-native-elements'
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'
import { useDispatch } from 'react-redux'
import AuthApi from './api/AuthApi'
const { height } = Dimensions.get('window')

const LoginScreen = (props: any) => {
  const dispatch = useDispatch()
  const [isDialogLoading, setDialogLoading] = useState(false)
  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState('')
  const phoneRef = useRef<RNTextInput>(null)
  const phoneInputRef = useRef<TextInput>(null)
  const passRef = useRef<RNTextInput>(null)
  const passInputRef = useRef<TextInput>(null)
  const [isCheck, setIsCheck] = useState<boolean>(false)

  const requestLogin = async () => {
    let isValid = true
    let inputRef = null
    if (!phone || phone?.trim() === '' || phone.length < 10) {
      phoneRef.current?.onValidate()
      isValid = false
      if (!inputRef) inputRef = phoneInputRef
    }

    if (
      !password ||
      password?.trim() === '' ||
      password?.length < 6 ||
      password?.length > 55
    ) {
      passRef.current?.onValidate()
      isValid = false
      if (!inputRef) inputRef = passInputRef
    }

    if (!isValid) {
      if (inputRef) inputRef.current?.focus()
      return
    }
    const payload = {
      phone: phone,
      password: password,
    }

    try {
      setDialogLoading(true)
      const res = isCheck
        ? await AuthApi.loginAdmin(payload)
        : await AuthApi.login(payload)
      setDialogLoading(false)
      await AsyncStorageService.putToken(res?.data?.access_token?.token)
      if (isCheck) {
        dispatch(navigateSwitch(SCREEN_ROUTER.MAIN_ADMIN))
      } else {
        dispatch(navigateSwitch(SCREEN_ROUTER.MAIN))
      }
    } catch (error) {
      setDialogLoading(false)
    }
  }

  return (
    <ScreenWrapper
      unsafe
      dialogLoading={isDialogLoading}
      forceInset={['left']}
      children={
        <>
          <KeyboardAvoidingView
            style={styles.v_keyboard}
            enabled
            behavior={'padding'}
            keyboardVerticalOffset={-1000}
          >
            <ScrollView
              style={styles.v_scroll}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <ImageBackground
                source={R.images.ic_backgroud}
                style={styles.img_bg}
                resizeMode="cover"
              />
              <Card style={styles.root_view}>
                <View
                  style={styles.v_container}
                  children={
                    <>
                      <FstImage
                        resizeMode="contain"
                        tintColor={'#FE724C'}
                        style={styles.img_logo}
                        source={R.images.ic_logo}
                      />
                      <Text
                        style={styles.txt_title}
                        children={R.strings().login_with_your_account}
                      />
                      <RNTextInput
                        ref={phoneRef}
                        refs={phoneInputRef}
                        title={R.strings().phone}
                        value={phone}
                        placeholder={R.strings().input_phone}
                        keyboardType="number-pad"
                        onChangeText={setPhone}
                        placeholderTextColor={colors.colorDefault.placeHolder}
                        valueType="phone"
                        isRequire
                      />

                      <RNTextInput
                        autoCapitalize="none"
                        maxLength={16}
                        ref={passRef}
                        refs={passInputRef}
                        title={R.strings().password}
                        secureTextEntry
                        value={password}
                        placeholder={R.strings().input_password}
                        keyboardType="default"
                        onChangeText={setPassword}
                        placeholderTextColor={colors.colorDefault.placeHolder}
                        isRequire
                        valueType="password"
                      />

                      <View style={styles.v_forgot_pass}>
                        <CheckBox
                          containerStyle={styles.containerChk}
                          title={'Register with an admin account'}
                          checkedIcon={
                            <FstImage
                              style={styles.ic_check}
                              resizeMode="contain"
                              source={R.images.ic_checked}
                            />
                          }
                          uncheckedIcon={
                            <FstImage
                              style={styles.ic_check}
                              resizeMode="contain"
                              source={R.images.ic_unchecked}
                            />
                          }
                          textStyle={styles.text}
                          checked={isCheck}
                          onPress={() => setIsCheck(!isCheck)}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            // NavigationUtil.navigate(
                            //   SCREEN_ROUTER_AUTH.FORGOT_PASSWORD
                            // )
                          }}
                          children={
                            <Text
                              style={styles.txt_forgot_pass}
                              children={`${R.strings().forgot_password} ?`}
                            />
                          }
                        />
                      </View>
                      <RNButton
                        onPress={requestLogin}
                        title={R.strings().login}
                      />
                      <View style={styles.v_register}>
                        <Text
                          style={styles.txt_question}
                          children={R.strings().you_have_not_an_account}
                        />
                        <Text
                          onPress={() => {
                            NavigationUtil.navigate(SCREEN_ROUTER_AUTH.REGISTER)
                          }}
                          style={styles.txt_register}
                          children={R.strings().register}
                        />
                      </View>
                    </>
                  }
                />
              </Card>
            </ScrollView>
            {/* <TouchableOpacity
              style={styles.v_back}
              onPress={() => {
                dispatch(navigateSwitch(SCREEN_ROUTER.MAIN))
              }}
              children={
                <FstImage
                  source={R.images.img_back}
                  style={styles.ic_back}
                  resizeMode="contain"
                />
              }
            /> */}
          </KeyboardAvoidingView>
        </>
      }
    />
  )
}

const styles = StyleSheet.create({
  v_back: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: isIphoneX() ? getStatusBarHeight() + 20 : getStatusBarHeight() + 10,
    left: 15,
  },
  v_keyboard: {
    flex: 1,
    backgroundColor: 'white',
  },
  v_scroll: {
    backgroundColor: 'white',
    flex: 1,
  },
  img_bg: {
    width: '100%',
    height: height / 2.4,
  },
  ic_back: {
    width: 40,
    height: 40,
  },
  root_view: {
    paddingHorizontal: 30,
    borderWidth: 0,
    justifyContent: 'center',
    // borderRadius: 1,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    marginHorizontal: 0,
    shadowRadius: 0,
    marginTop: -60,
  },
  ic_check: {
    width: 18,
    height: 18,
  },
  v_container: {
    paddingVertical: 40,
  },
  img_logo: {
    height: 45,
    width: 133,
    alignSelf: 'center',
  },
  txt_title: {
    marginVertical: 24,
    fontFamily: R.fonts.san_regular,
    fontSize: 15,
    alignSelf: 'center',
  },
  containerChk: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 0,
    marginLeft: 0,
    padding: 0,
    marginTop: 0,
    //  / paddingBottom: 15,
  },
  text: {
    fontSize: 14,
    fontFamily: R.fonts.san_regular,
    fontWeight: '400',
    color: colors.label,
  },
  txt_forgot_pass: {
    color: colors.colorDefault.text,
    fontSize: 14,
    fontFamily: R.fonts.san_regular,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  v_forgot_pass: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 40,
  },
  v_register: {
    flexDirection: 'row',
    marginTop: -60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 200,
  },
  txt_question: {
    fontFamily: R.fonts.san_regular,
    fontSize: 15,
    color: 'black',
  },
  txt_register: {
    fontFamily: R.fonts.san_regular,
    fontSize: 16,
    color: colors.primary,
    marginLeft: 5,
  },
})

export default LoginScreen
