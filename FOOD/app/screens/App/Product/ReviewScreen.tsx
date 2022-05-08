/* eslint-disable react-native/no-inline-styles */
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import Empty from '@app/components/Empty/Empty'
import ProductApi from './api/ProductApi'
import FstImage from '@app/components/FstImage/FstImage'
import R from '@app/assets/R'
import { fonts } from '@app/theme'
import DateUtil from '@app/utils/DateUtil'

const ReviewScreen = props => {
  const [data, setData] = useState([])

  useEffect(() => {
    getListReview()
  }, [])

  const getListReview = async () => {
    try {
      const res = await ProductApi.getReviews({ id: props?.route?.params.id })
      setData(res.data)
    } catch (error) {}
  }
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <View style={styles.v_info}>
            <View>
              <FstImage
                style={{ width: 48, height: 48 }}
                source={R.images.ic_avatar_default}
              />
              <View style={styles.v_evaluate}>
                <Text style={styles.txt_evaluate}>{+item?.point}</Text>
              </View>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text
                style={{ ...fonts.regular15, fontWeight: '500' }}
              >{`${item.user.first_name} ${item.user.last_name}`}</Text>
              <Text
                style={{ ...fonts.regular13, color: '#B3B3B3', marginTop: 3 }}
              >{`${DateUtil.formatShortYear(item.user.created_at)}`}</Text>
            </View>
          </View>
          <Text style={{ ...fonts.regular15, color: '#7F7D92', marginTop: 10 }}>
            {item.comment}
          </Text>
        </View>
      )
    },
    []
  )

  const keyExtractor = useCallback(item => `${item.food_id}`, [])

  return (
    <ScreenWrapper
      back
      unsafe
      color="black"
      titleHeader="Review"
      backgroundHeader="white"
      forceInset={['left']}
      children={
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Empty />}
        />
      }
    />
  )
}

export default ReviewScreen

const styles = StyleSheet.create({
  v_info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  v_evaluate: {
    backgroundColor: '#FFC529',
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    position: 'absolute',
    right: -10,
    bottom: 5,
    shadowColor: '#FFC529',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
  txt_evaluate: {
    ...fonts.semi_bold9,
    color: 'white',
    alignSelf: 'center',
  },
})
