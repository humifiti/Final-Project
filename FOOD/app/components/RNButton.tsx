import R from '@app/assets/R'
import * as theme from '@app/theme'
import { colors } from '@app/theme'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native'
import { Header } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import NavigationUtil from '../navigation/NavigationUtil'

interface Props {
  color?: string
  title: string
  onPress: () => void
  style?: StyleProp<TextStyle>
}

export default class RNButton extends Component<Props> {
  render() {
    const { color, title, onPress, style } = this.props
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.v_container, style]}
        children={<Text style={styles.text} children={title} />}
      />
    )
  }
}

const styles = StyleSheet.create({
  v_container: {
    marginBottom: 100,
    borderRadius: 16,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontFamily: R.fonts.san_semi_bold,
    fontSize: 16,
    color: 'white',
    flex: 1,
  },
})
