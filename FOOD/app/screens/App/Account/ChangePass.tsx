import R from '@app/assets/R'
import RNButton from '@app/components/RNButton'
import RNTextInput from '@app/components/RNTextInput'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
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

const ChangePassWordScreenComponent = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const oldPassRef = useRef<RNTextInput>(null)
  const oldPassInputRef = useRef<TextInput>(null)
  const passRef = useRef<RNTextInput>(null)
  const passInputRef = useRef<TextInput>(null)
  const confirmPassRef = useRef<RNTextInput>(null)
  const confirmPassInputRef = useRef<TextInput>(null)

  const handleUpdatePass = () => {
    let isValid = true
    let inputRef = null

    if (
      oldPassword.trim() === '' ||
      oldPassword.length < 6 ||
      oldPassword.length > 55
    ) {
      oldPassRef.current?.onValidate()
      isValid = false
      if (!inputRef) inputRef = oldPassInputRef
    }

    if (password.trim() === '' || password.length < 6 || password.length > 55) {
      passRef.current?.onValidate()
      isValid = false
      if (!inputRef) inputRef = passInputRef
    }
    if (
      confirmPassword.trim() === '' ||
      confirmPassword.length < 6 ||
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
      password: password,
    }
  }

  return (
    <ScreenWrapper
      unsafe
      color="black"
      backgroundHeader="white"
      back
      forceInset={['left']}
      titleHeader={R.strings().change_password}
      children={
        <KeyboardAvoidingView
          enabled
          behavior={'padding'}
          keyboardVerticalOffset={-1000}
          style={styles.v_keyboard}
        >
          <ScrollView
            keyboardShouldPersistTaps={'always'}
            style={styles.v_scroll}
            showsVerticalScrollIndicator={false}
          >
            <RNTextInput
              autoCapitalize="none"
              maxLength={16}
              ref={oldPassRef}
              refs={oldPassInputRef}
              title={'Old Password'}
              secureTextEntry
              value={oldPassword}
              placeholder={'Enter Old Password'}
              keyboardType="default"
              onChangeText={setOldPassword}
              placeholderTextColor={colors.colorDefault.placeHolder}
              isRequire
              valueType="password"
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
              onChangeText={setConfirmPassword}
              placeholderTextColor={colors.colorDefault.placeHolder}
              isRequire
              valueType="password"
              containerStyle={styles.v_textInput}
            />

            <RNButton onPress={handleUpdatePass} title={R.strings().confirm} />
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
  v_textInput: {
    marginBottom: 40,
  },
})

const ChangePassWordScreen = memo(ChangePassWordScreenComponent, isEqual)

export default ChangePassWordScreen
