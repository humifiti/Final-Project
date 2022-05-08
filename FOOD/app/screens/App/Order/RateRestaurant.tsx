/* eslint-disable react-native/no-inline-styles */
import FstImage from '@app/components/FstImage/FstImage'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors, fonts } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useState } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { AirbnbRating } from 'react-native-elements'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import OrderApi from './api/OrderApi'
const RateRestaurant = props => {
  const [point, setPoint] = useState(1)
  const [comment, setComment] = useState('')

  const handleSubmit = async () => {
    showLoading()
    try {
      await OrderApi.ratingRestaurant({
        restaurant_id: props.route.params.id,
        point,
        comment,
      })
      NavigationUtil.goBack()
    } catch (error) {
    } finally {
      hideLoading()
    }
  }
  return (
    <>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        style={{ flex: 1 }}
      >
        <View style={styles.logo}>
          <FstImage
            style={styles.icon}
            source={{ uri: props.route.params.logo }}
          />
        </View>
        <Text
          style={styles.text}
        >{`How was your order from ${props.route.params.name} ?`}</Text>
        <AirbnbRating
          onFinishRating={(value: number) => {
            setPoint(value)
          }}
        />
        <TextInput
          onChangeText={setComment}
          style={styles.textInput}
          placeholder="Write"
        />
        <View style={styles.v_line} />
      </KeyboardAwareScrollView>
      <TouchableOpacity onPress={handleSubmit} style={styles.v_button}>
        <Text style={{ color: 'white', ...fonts.semi_bold15 }}>SUBMIT</Text>
      </TouchableOpacity>
    </>
  )
}

export default RateRestaurant

const styles = StyleSheet.create({
  v_button: {
    backgroundColor: colors.primary,
    marginBottom: Platform.OS === 'android' ? 30 : getBottomSpace(),
    marginHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 28.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  v_line: {
    height: 1.5,
    backgroundColor: colors.line,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  textInput: {
    marginHorizontal: 20,
    marginTop: 40,
    fontSize: 15,
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  logo: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
    shadowColor: '#C4C4C4',
    shadowOffset: {
      width: 9,
      height: 9,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
    alignSelf: 'center',
    marginTop: 80,
  },
  icon: {
    width: 74,
    height: 74,
  },
})
