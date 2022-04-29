import R from '@app/assets/R'
import RNButton from '@app/components/RNButton'
import RNTextInput from '@app/components/RNTextInput'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import reactotron from '@app/config/ReactotronConfig'
import { SCREEN_ROUTER_AUTH } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors } from '@app/theme'
import { showMessages } from '@app/utils/AlertHelper'
import React, { memo, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native'
import AuthApi from './api/AuthApi'

const RegisterScreenComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const firstNameRef = useRef<RNTextInput>(null)
  const firstNameInputRef = useRef<TextInput>(null)
  const lastNameRef = useRef<RNTextInput>(null)
  const lastNameInputRef = useRef<TextInput>(null)
  const phoneRef = useRef<RNTextInput>(null)
  const phoneInputRef = useRef<TextInput>(null)
  const passRef = useRef<RNTextInput>(null)
  const passInputRef = useRef<TextInput>(null)
  const confirmPassRef = useRef<RNTextInput>(null)
  const confirmPassInputRef = useRef<TextInput>(null)

  const handleRegister = async () => {
    let isValid = true
    let inputRef = null

    if (!firstName || firstName?.trim() === '') {
      firstNameRef.current?.onValidate()
      isValid = false
      if (!inputRef) inputRef = firstNameInputRef
    }

    if (!lastName || lastName?.trim() === '') {
      lastNameRef.current?.onValidate()
      isValid = false
      if (!inputRef) inputRef = lastNameInputRef
    }

    if (!phone || phone?.trim() === '' || phone.length < 10) {
      phoneRef.current?.onValidate()
      isValid = false
      if (!inputRef) inputRef = phoneInputRef
    }

    if (password.trim() === '' || password.length < 8 || password.length > 55) {
      passRef.current?.onValidate()
      isValid = false
      if (!inputRef) inputRef = passInputRef
    }
    if (
      confirmPassword.trim() === '' ||
      confirmPassword.length < 8 ||
      password.length > 55
    ) {
      confirmPassRef.current?.onValidate()
      isValid = false
      if (!inputRef) inputRef = confirmPassInputRef
    }

    if (confirmPassword !== password) {
      showMessages(
        R.strings().notification,
        R.strings().confirm_password_not_success
      )
      confirmPassInputRef.current?.focus()
      return
    }

    if (!isValid) {
      if (inputRef) inputRef.current?.focus()
      return
    }

    const payload = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      password: password,
    }

    try {
      setIsLoading(true)
      await AuthApi.register(payload)
      setIsLoading(false)
      NavigationUtil.navigate(SCREEN_ROUTER_AUTH.OTP, { phone: phone })
    } catch (error: any) {
      setIsLoading(false)
      if (error?.response?.data.message === 'Phone number was not activated') {
        await AuthApi.resendOtp({
          phone: phone,
        })
        NavigationUtil.navigate(SCREEN_ROUTER_AUTH.OTP, { phone: phone })
      }
      reactotron.log!(error?.response?.data.message)
    }
  }

  return (
    <ScreenWrapper
      unsafe
      color="black"
      backgroundHeader="white"
      back
      dialogLoading={isLoading}
      forceInset={['left']}
      titleHeader={R.strings().register}
      children={
        <KeyboardAvoidingView
          enabled
          behavior={'padding'}
          keyboardVerticalOffset={-1000}
          style={styles.v_keyboard}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.v_scroll}
            showsVerticalScrollIndicator={false}
          >
            <RNTextInput
              autoCapitalize="none"
              ref={firstNameRef}
              refs={firstNameInputRef}
              title={R.strings().first_name}
              value={firstName}
              placeholder={R.strings().input_first_name}
              keyboardType="default"
              onChangeText={setFirstName}
              maxLength={45}
              placeholderTextColor={colors.colorDefault.placeHolder}
              valueType="name"
              isRequire
            />
            <RNTextInput
              autoCapitalize="none"
              ref={lastNameRef}
              refs={lastNameInputRef}
              title={R.strings().last_name}
              value={lastName}
              placeholder={R.strings().input_last_name}
              keyboardType="default"
              onChangeText={setLastName}
              maxLength={45}
              placeholderTextColor={colors.colorDefault.placeHolder}
              valueType="name"
              isRequire
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
            <RNTextInput
              autoCapitalize="none"
              maxLength={16}
              ref={confirmPassRef}
              refs={confirmPassInputRef}
              title={R.strings().confirm_password}
              secureTextEntry
              value={confirmPassword}
              placeholder={R.strings().input_confirm_password}
              keyboardType="default"
              onChangeText={confirmPassword => {
                setConfirmPassword(confirmPassword)
              }}
              placeholderTextColor={colors.colorDefault.placeHolder}
              isRequire
              valueType="password"
            />

            <RNButton onPress={handleRegister} title={R.strings().register} />
          </ScrollView>
        </KeyboardAvoidingView>
      }
    />
  )
}

const styles = StyleSheet.create({
  v_keyboard: {
    flex: 1,
    backgroundColor: 'white',
  },
  v_scroll: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  ic_check: {
    width: 18,
    height: 18,
  },
  text: {
    fontSize: 16,
    fontFamily: R.fonts.san_regular,
    fontWeight: '400',
    color: colors.label,
  },
  containerChk: {
    backgroundColor: 'white',
    borderWidth: 0,
    marginLeft: 0,
    padding: 0,
    paddingBottom: 15,
  },
})

const RegisterScreen = memo(RegisterScreenComponent, isEqual)

export default RegisterScreen
