/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import FstImage from '@app/components/FstImage/FstImage'
import { fonts } from '@app/theme'
import R from '@app/assets/R'
import HomeApi from './api/HomeApi'
import { formatNumber } from '@app/utils/Format'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'

const { width } = Dimensions.get('window')
const ListFood = (props: { search: string }) => {
  const [data, setData] = useState([])
  const refTimeout = useRef<any>()
  useEffect(() => {
    if (refTimeout.current) clearTimeout(refTimeout.current)

    refTimeout.current = setTimeout(() => {
      getListFood()
    }, 500)
  }, [props.search])

  const getListFood = async () => {
    showLoading()
    try {
      const res = await HomeApi.searchFood({ name: props.search })
      setData(res.data)
    } catch (error) {
    } finally {
      hideLoading()
    }
  }
  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <TouchableOpacity style={styleListFood.v_container}>
        <FstImage
          style={styleListFood.image}
          source={{ uri: item?.images?.url }}
        />
        <View style={{ marginTop: 11, paddingLeft: 5 }}>
          <Text style={{ ...fonts.semi_bold15 }}> {item?.name}</Text>
          <Text
            numberOfLines={2}
            style={{ ...fonts.regular12, color: '#5B5B5E', marginTop: 8 }}
          >
            {item?.description}
          </Text>
        </View>
        <View style={styleListFood.v_row}>
          <Text style={{ ...fonts.semi_bold14 }}>{`${formatNumber(
            item.price
          )} đ`}</Text>
        </View>
      </TouchableOpacity>
    )
  }, [])
  const keyExtractor = useCallback(item => `${item.id}`, [])
  return (
    <FlatList
      onRefresh={getListFood}
      refreshing={false}
      contentContainerStyle={{ paddingBottom: 50 }}
      style={styleListFood.v_listProduct}
      columnWrapperStyle={styleListFood.v_column}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      numColumns={2}
    />
  )
}

export default ListFood

const styleListFood = StyleSheet.create({
  v_listProduct: {
    paddingHorizontal: 25,
    paddingBottom: Platform.OS === 'ios' ? 60 : 80,
    //backgroundColor: 'red',
  },
  v_column: {
    justifyContent: 'space-between',
  },
  image: { width: '100%', aspectRatio: 1, borderRadius: 15 },
  v_container: {
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 9,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,

    elevation: 6,
    marginTop: 20,
    width: width * 0.4,
    paddingBottom: 15,
  },
  v_row: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 10,
    top: 10,
    paddingHorizontal: 7,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
})
