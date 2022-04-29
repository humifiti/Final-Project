import R from '@app/assets/R'
import FstImage from '@app/components/FstImage/FstImage'
import { colors } from '@app/theme'
import React, { Component, LegacyRef } from 'react'
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'
import { Source } from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const PASSWORD_REGEX = /^.{8,25}$/
const NAME_REGEX = /^[a-zA-Z0-9]*[a-zA-Z]\S*$/
const ADDRESS_REGEX = /([a-zA-Z]+)([a-z0-9A-Z])*/
//([a-zA-z])*
type Props<T> = TextInputProps &
  ViewProps & {
    isRequire?: boolean
    iconRight?: boolean
    onOpenModal?: any
    containerStyle?: StyleProp<ViewStyle>
    title?: string
    secureTextEntry?: boolean
    icon?: Source | number
    refs?: LegacyRef<T>
    textStyle?: StyleProp<TextStyle>
    wrapStyle?: StyleProp<ViewStyle>
    editable?: boolean
    valueType?:
      | 'name'
      | 'phone'
      | 'email'
      | 'password'
      | 'cmnd'
      | 'address'
      | 'normal'
  }

interface State {
  errorMessage: string
  isSecureText: boolean
  isFocus: boolean
}

class RNTextInput extends Component<Props<any>, State> {
  constructor(props: any) {
    super(props)
    const { secureTextEntry } = props

    this.state = {
      errorMessage: '',
      isSecureText: secureTextEntry,
      isFocus: false,
    }
  }

  UNSAFE_componentWillReceiveProps(newProps: any) {
    const { value } = newProps
    this.validateAction(value)
  }

  onValidate = () => {
    const { value } = this.props
    this.validateAction(value, true)
  }

  validateAction = (value: string | undefined, isCall = false) => {
    const { title, valueType, isRequire, placeholder } = this.props
    if (typeof value === 'string' ? !!value.trim() : !!value) {
      switch (valueType) {
        case 'name': {
          this.validateName(value)
          break
        }
        case 'email': {
          this.validateEmail(value)
          break
        }
        case 'phone': {
          this.validatePhone(value)
          break
        }
        case 'password': {
          this.validatePassword(value)
          break
        }
        case 'address': {
          this.validateAddress(value, title)
          break
        }

        default:
          this.setState({ errorMessage: '' })
          break
      }
    } else {
      if ((this.state.isFocus || isCall) && isRequire) {
        this.setState({
          errorMessage: (title || placeholder) + ' is being blank',
        })
      }
    }
  }
  validateName = (value: string | undefined) => {
    if (`${value}`.length < 4) {
      this.setState({ errorMessage: 'Fullname is invalid' })
    } else this.setState({ errorMessage: '' })
  }

  validatePhone = (value: string | undefined) => {
    if (`${value}`.length < 10) {
      this.setState({ errorMessage: 'Phone is invalid' })
    } else this.setState({ errorMessage: '' })
  }

  validateEmail = (value: string | undefined) => {
    if (!EMAIL_REGEX.test(`${value}`)) {
      this.setState({ errorMessage: 'Email is invalid' })
    } else this.setState({ errorMessage: '' })
  }
  validatePassword = (value: string | undefined) => {
    if (!PASSWORD_REGEX.test(`${value}`)) {
      this.setState({ errorMessage: 'Password is invalid' })
    } else this.setState({ errorMessage: '' })
  }
  validateAddress = (value: string | undefined, title: any) => {
    if (!ADDRESS_REGEX.test(`${value}`)) {
      this.setState({ errorMessage: `${title} is invalid` })
    } else this.setState({ errorMessage: '' })
  }

  render() {
    const {
      containerStyle,
      title,
      isRequire,
      wrapStyle,
      refs,
      value,
      textStyle,
      secureTextEntry,
      valueType,
      icon,
      editable,
      iconRight,
      onOpenModal,
      ...otherProps
    } = this.props
    const { errorMessage, isFocus, isSecureText } = this.state
    return (
      <View style={[containerStyle]}>
        <Text style={styles.title}>
          {title}{' '}
          {!!isRequire && <Text children="*" style={{ color: 'red' }} />}
        </Text>
        <TouchableOpacity
          onPress={onOpenModal}
          style={[styles.wrap_text_input, wrapStyle]}
        >
          {!!icon && (
            <FstImage
              source={icon}
              style={{ width: 20, aspectRatio: 1 }}
              resizeMode="contain"
            />
          )}
          <TextInput
            editable={editable}
            autoCapitalize="none"
            ref={refs}
            value={value}
            style={[styles.text_input, textStyle]}
            secureTextEntry={isSecureText}
            onFocus={e => this.setState({ isFocus: true })}
            onBlur={e => {
              this.setState({ isFocus: false })
              if (isRequire) this.validateAction(value)
            }}
            {...otherProps}
          />
          {!!secureTextEntry && (
            <TouchableOpacity
              onPress={() => this.setState({ isSecureText: !isSecureText })}
            >
              <FstImage
                source={isSecureText ? R.images.ic_eye : R.images.ic_eye_hide}
                style={{ width: 20, aspectRatio: 1 }}
                tintColor={'#C5C5C5'}
                resizeMode="contain"
              />
              {/* <FstImage
                source={R.images.ic_eye}
                style={{ width: 20, aspectRatio: 1 }}
                resizeMode="contain"
              /> */}
            </TouchableOpacity>
          )}
          {!!iconRight && (
            <TouchableOpacity onPress={() => {}}>
              <FstImage
                source={R.images.ic_arrow_down}
                style={{ width: 12, height: 6 }}
                resizeMode="contain"
              />
              {/* <FstImage
                source={R.images.ic_eye}
                style={{ width: 20, aspectRatio: 1 }}
                resizeMode="contain"
              /> */}
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        <View style={styles.lines} />
        <Text style={styles.error_message} children={errorMessage} />
      </View>
    )
  }
}

export default RNTextInput

const styles = StyleSheet.create({
  wrap_text_input: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    paddingTop: (Platform.OS == 'ios' && 5) || 0,
    // paddingBottom: (Platform.OS == 'ios' && 5) || 0
    paddingBottom: 0,
    // paddingHorizontal: '2.5%',
    // borderRadius: 25
  },
  text_input: {
    paddingVertical: 10,
    flex: 1,
    paddingLeft: 10,
    color: 'black',
    fontFamily: R.fonts.san_regular,
    fontSize: 16,
  },
  title: {
    fontFamily: R.fonts.san_regular,
    fontSize: 14,
    color: colors.label,
  },
  error_message: {
    fontFamily: R.fonts.san_light_italic,
    textAlign: 'right',
    color: 'red',
    fontSize: 12,
    marginTop: '1%',
  },
  lines: {
    height: 1,
    //width: width,
    backgroundColor: colors.line,
  },
})
