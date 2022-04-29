import R from '@app/assets/R'
import RNButton from '@app/components/RNButton'
import RNTextInput from '@app/components/RNTextInput'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { SCREEN_ROUTER_AUTH } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors } from '@app/theme'
import React, { memo, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native'

const ForgotPasswordScreenComponent = () => {
  const [phone, setPhone] = useState('')
  const phoneRef = useRef<RNTextInput>(null)
  const phoneInputRef = useRef<TextInput>(null)
  return (
    <ScreenWrapper
      back
      unsafe
      color="black"
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().forgot_password}
      children={
        <KeyboardAvoidingView
          enabled
          behavior="height"
          style={styles.v_keyboard}
        >
          <ScrollView
            keyboardShouldPersistTaps={'always'}
            style={styles.v_scroll}
          >
            <Text
              style={styles.v_note}
              children={R.strings().note_input_phone}
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
              containerStyle={styles.v_textInput}
            />
            <RNButton
              onPress={() => {
                NavigationUtil.navigate(SCREEN_ROUTER_AUTH.OTP)
              }}
              title={R.strings().send}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      }
    />
  )
}

const styles = StyleSheet.create({
  v_keyboard: {
    flex: 1,
  },
  v_scroll: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  v_note: {
    textAlign: 'center',
    fontFamily: R.fonts.san_regular,
    fontSize: 16,
    color: colors.colorDefault.text,
    marginHorizontal: 25,
    marginBottom: 50,
  },
  v_textInput: {
    marginBottom: 40,
  },
})
const ForgotPasswordScreen = memo(ForgotPasswordScreenComponent, isEqual)

export default ForgotPasswordScreen
