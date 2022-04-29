import * as theme from '@app/theme'

import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import React, { Component } from 'react'
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'

import FastImage from 'react-native-fast-image'
import { Header } from 'react-native-elements'
import NavigationUtil from '../navigation/NavigationUtil'
import R from '@app/assets/R'

interface Props {
  color?: string
  backgroundHeader?: string
  borderBottomHeader?: string
  back?: boolean
  isLeft?: boolean
  /**
   * View nút phải
   */
  rightComponent?: React.ReactNode
  /**
   * View nút trái
   */
  leftComponent?: React.ReactNode
  centerComponent?: React.ReactNode

  /**
   * Title thanh header
   */
  titleHeader: string
  numberLine?: number
  onPress?: () => void
}
interface BackProps {
  style?: ViewStyle
  isWhiteBackground?: boolean
  onPress?: () => void
}
export class BackButton extends Component<BackProps> {
  render() {
    const { style, onPress } = this.props
    return (
      <TouchableOpacity
        style={[style || styles.leftComp]}
        onPress={onPress ? onPress : NavigationUtil.goBack}
      >
        <FastImage
          source={R.images.ic_back}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: 24, height: 24 }}
          tintColor={theme.colors.black}
          resizeMode="contain"
        />
      </TouchableOpacity>
    )
  }
}

export default class RNHeader extends Component<Props> {
  render() {
    const {
      color,
      numberLine,
      back,
      titleHeader,
      rightComponent,
      leftComponent,
      centerComponent,
      borderBottomHeader,
      backgroundHeader,
      onPress,
    } = this.props
    return (
      <Header
        placement="center"
        containerStyle={{
          // /backgroundColor: 'red',
          backgroundColor: backgroundHeader || theme.colors.primary,
          borderBottomColor: borderBottomHeader || theme.colors.primary,
          height:
            Platform.OS !== 'ios'
              ? undefined
              : numberLine === 2
              ? getStatusBarHeight() + (!isIphoneX() ? 65 : 85)
              : getStatusBarHeight() + (!isIphoneX() ? 65 : 65),
          // height: numberLine == 2 ? 110 : 0,
        }}
        leftComponent={
          <>
            {back ? (
              <BackButton onPress={onPress} />
            ) : leftComponent ? (
              leftComponent
            ) : null}
          </>
        }
        centerComponent={
          <Text
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              {
                fontSize: 17,
                fontFamily: R.fonts.san_semi_bold,
              },
              { color: color || 'white' },
            ]}
          >
            {titleHeader}
          </Text>
        }
        rightComponent={rightComponent}
        statusBarProps={{
          barStyle: 'dark-content',
          translucent: true,
          backgroundColor: 'transparent',
          // barStyle: 'light-content',
          // translucent: true,
          // // backgroundColor: 'blue',
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  leftComp: {
    marginTop: -20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 50,
    paddingTop: 20,
    paddingBottom: 10,
    width: 30,
  },
  rightComp: {
    //height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
})
