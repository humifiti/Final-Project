/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import R from '@app/assets/R'
import Empty from '@app/components/Empty/Empty'
import FstImage from '@app/components/FstImage/FstImage'
import { DEFAULT_PARAMS, SCREEN_ROUTER_APP } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors, fonts } from '@app/theme'
import { formatNumber } from '@app/utils/Format'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { getListFavoriteFood } from '../Favorite/slice/ListFavoriteFoodSlice'
import ProductApi from '../Product/api/ProductApi'
import HomeApi from './api/HomeApi'

const { width } = Dimensions.get('window')

const ListFood = (props: { searchText: string }) => {
  const [dataListFood, setDataListFood] = useState([])
  const refTimeout = useRef<any>()
  const dispatch = useDispatch()

  useEffect(() => {
    if (refTimeout.current) clearTimeout(refTimeout.current)

    refTimeout.current = setTimeout(() => {
      getListFood()
    }, 500)
  }, [props.searchText])

  const getListFood = async () => {
    showLoading()
    try {
      const res = await HomeApi.searchFood({ name: props.searchText })
      setDataListFood(res.data)
    } catch (error) {
    } finally {
      hideLoading()
    }
  }

  const handleLike = async (item: any) => {
    try {
      if (item.is_like) {
        await ProductApi.unLikeFood({ food_id: item.id })
        getListFood()
        dispatch(
          getListFavoriteFood({
            page: DEFAULT_PARAMS.PAGE,
            limit: DEFAULT_PARAMS.LIMIT,
          })
        )
      } else {
        await ProductApi.likeFood({ food_id: item.id })
        getListFood()
        dispatch(
          getListFavoriteFood({
            page: DEFAULT_PARAMS.PAGE,
            limit: DEFAULT_PARAMS.LIMIT,
          })
        )
      }
    } catch (error) {}
  }

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.RESTAURANT_DETAIL, {
            id: item.restaurant_id,
          })
        }}
        style={styleListFood.v_container}
      >
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
        <TouchableOpacity
          onPress={() => {
            handleLike(item)
          }}
          style={[
            styleListFood.icon_like,
            { backgroundColor: item.is_like ? colors.primary : colors.line },
          ]}
        >
          <FstImage
            style={{ width: 18, height: 18 }}
            source={R.images.ic_heart}
          />
        </TouchableOpacity>
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
      data={dataListFood}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      ListEmptyComponent={<Empty />}
    />
  )
}

export default ListFood

const styleListFood = StyleSheet.create({
  icon_like: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35 / 2,
    position: 'absolute',
    top: 15,
    right: 10,
  },
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
