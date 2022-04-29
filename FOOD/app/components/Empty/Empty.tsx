import R from '@app/assets/R'
import { colors } from '@app/theme'
import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { EmptyProps } from './Empty.props'
const { width, height } = Dimensions.get('window')

export default class Empty extends Component<EmptyProps> {
  state = {
    marginTop: height / 5,
  }

  render() {
    const { header, sourceImage, description, marginTop } = this.props
    return (
      <View
        onLayout={event => {
          const result = header
            ? event.nativeEvent.layout.height / 2
            : event.nativeEvent.layout.height
          this.setState({ marginTop: result })
        }}
        style={{
          marginTop: marginTop ? marginTop : this.state.marginTop,
          alignItems: 'center',
          backgroundColor: colors.white,
          justifyContent: 'center',
        }}
      >
        <FastImage
          source={sourceImage || R.images.img_empty}
          style={styles.imageEmpty}
          resizeMode="contain"
        />
        {/* <Text style={styles.textEmpty}>
          {description || 'Bạn chưa có đơn hàng nào'}
        </Text> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageEmpty: {
    width: width / 2,
    height: width / 2,
  },
  textEmpty: {
    fontFamily: R.fonts.sf_regular,
    fontSize: 14,
    color: colors.black,
    marginTop: 10,
  },
})
