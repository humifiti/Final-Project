import R from '@app/assets/R'
import { Otp } from '@app/components/Otp/Otp'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { SCREEN_ROUTER, SCREEN_ROUTER_AUTH } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import { colors } from '@app/theme'
import React, { memo, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useDispatch } from 'react-redux'
import AuthApi from './api/AuthApi'
const OtpScreenComponent = (props: {
  route: { params: { otp: string; phone: string } }
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [otp, setOtp] = useState<string>('')
  const isClearText = useRef<boolean>(false)

  const handleOtpPhone = async (otpPhone: string) => {
    const payload = {
      otp: otpPhone,
      phone: props.route.params.phone,
    }
    try {
      setIsLoading(true)
      const res = await AuthApi.active(payload)
      setIsLoading(false)
      NavigationUtil.navigate(SCREEN_ROUTER_AUTH.LOGIN)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const sentOtpPhone = async () => {
    try {
      setIsLoading(true)
      const res = await AuthApi.resendOtp({
        phone: props?.route?.params?.phone,
      })
      isClearText.current = false
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }
  return (
    <ScreenWrapper
      back
      unsafe
      color="black"
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={'Vefification Code'}
      dialogLoading={isLoading}
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
            <Text style={styles.v_note} children={R.strings().note_otp} />

            <Otp
              onOtpValid={(text: string) => {
                if (text !== otp) {
                  setOtp(text)
                  handleOtpPhone(text)
                }

                // NavigationUtil.navigate(SCREEN_ROUTER_AUTH.CHANGE_PASSWORD)
              }}
              isClearText={isClearText.current}
              onOtpInValid={setOtp}
              textStyle={styles.text_otp}
              wrapInputStyle={styles.v_otp}
              length={4}
              containerStyle={styles.v_contain_otp}
            />
            {/* <View style={styles.v_countDown}>
              <Text
                style={styles.txt_countDown}
                children={`${R.strings().expire} 00:00`}
              />
            </View> */}

            <TouchableOpacity
              onPress={sentOtpPhone}
              // disabled={timeCountDown > 0 ? true : false}
            >
              <Text
                style={[
                  styles.txt_sendOtp,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                <Text style={{ color: '#9796A1' }}>
                  I don't recevie a code!
                </Text>{' '}
                Please resend
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      }
    />
  )
}

// const RenderCountUp = ({ timeCountDown }: { timeCountDown: number }) => {
//   const minutes = `0${Math.floor((timeCountDown % 3600) / 60)}`
//   const seconds = `0${(timeCountDown % 3600) % 60}`
//   const formatMinutes = minutes.substr(minutes.length - 2, 2)
//   const formatSeconds = seconds.substr(seconds.length - 2, 2)
//   return (
//     <>
//       {timeCountDown > 0 ? (
//         <Text
//           style={{ color: colors.primary, fontFamily: R.fonts.san_regular }}
//           children={`${formatMinutes}:${formatSeconds}`}
//         />
//       ) : (
//         <Text
//           style={{ color: colors.primary, fontFamily: R.fonts.san_regular }}
//           children={`00:00`}
//         />
//       )}
//     </>
//   )
// }

const styles = StyleSheet.create({
  v_keyboard: {
    flex: 1,
  },
  v_scroll: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 33,
  },
  v_note: {
    textAlign: 'center',
    fontFamily: R.fonts.san_regular,
    fontSize: 16,
    color: colors.colorDefault.text,
    marginHorizontal: 25,
    marginBottom: 16,
  },
  v_email: {
    textAlign: 'center',
    fontFamily: R.fonts.san_regular,
    fontSize: 16,
    color: colors.primary,
    marginHorizontal: 25,
    marginBottom: 24,
  },
  txt_countDown: {
    fontFamily: R.fonts.san_regular,
    fontSize: 16,
    color: colors.colorDefault.text,
  },
  v_textInput: {
    marginBottom: 40,
  },
  v_contain_otp: {
    marginBottom: 44,
  },
  v_otp: {
    //marginRight: 10,
  },
  text_otp: {
    fontSize: 40,
    color: colors.colorDefault.text,
    fontFamily: R.fonts.san_regular,
  },
  v_countDown: {
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt_sendOtp: {
    textAlign: 'center',
    fontFamily: R.fonts.san_semi_bold,
    fontSize: 16,
    color: colors.primary,
    marginBottom: 24,
  },
  v_button: {
    marginBottom: 30,
  },
})
const OtpScreen = memo(OtpScreenComponent, isEqual)

export default OtpScreen
