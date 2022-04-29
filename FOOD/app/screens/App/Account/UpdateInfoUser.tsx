import R from '@app/assets/R'
import RNButton from '@app/components/RNButton'
import RNTextInput from '@app/components/RNTextInput'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { useAppSelector } from '@app/store'
import { colors } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { memo, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native'
import { useDispatch } from 'react-redux'
import AccountApi from './api/AccountApi'
import Avatar from './components/Avatar'
import { getDataUserInfo } from './slice/AccountSlice'

const UpdateInfoUserComponent = () => {
  const userInfo = useAppSelector(state => state.accountReducer.data)
  const [profileImage, setProfileImage] = useState<string>(
    userInfo.user.avatar ? userInfo.user.avatar.url : ''
  )
  const [firstName, setFirstName] = useState<string>(
    userInfo.user.first_name ? userInfo.user.first_name : ''
  )
  const [lastName, setLastName] = useState<string>(
    userInfo.user.last_name ? userInfo.user.last_name : ''
  )
  const [phone, setPhone] = useState<string>(userInfo.user.phone)
  const firstNameRef = useRef<RNTextInput>(null)
  const firstNameInputRef = useRef<TextInput>(null)
  const lastNameRef = useRef<RNTextInput>(null)
  const lastNameInputRef = useRef<TextInput>(null)
  const phoneRef = useRef<RNTextInput>(null)
  const phoneInputRef = useRef<TextInput>(null)
  const dispatch = useDispatch()

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

    if (!isValid) {
      if (inputRef) inputRef.current?.focus()
      return
    }

    const payload = {
      last_name: lastName,
      first_name: firstName,
      avatar: {
        url: profileImage,
      },
    }
    showLoading()
    try {
      await AccountApi.updateProfile(payload)
      dispatch(getDataUserInfo())
      NavigationUtil.goBack()
    } catch (error: any) {
    } finally {
      hideLoading()
    }
  }

  return (
    <ScreenWrapper
      unsafe
      color="black"
      backgroundHeader="white"
      back
      forceInset={['left']}
      titleHeader={'My profile'}
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
            <Avatar
              onPress={(url: string) => {
                setProfileImage(url)
              }}
              url={profileImage}
            />
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
              editable={false}
            />

            <RNButton onPress={handleRegister} title={'Update'} />
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

const UpdateInfoUser = memo(UpdateInfoUserComponent, isEqual)

export default UpdateInfoUser
