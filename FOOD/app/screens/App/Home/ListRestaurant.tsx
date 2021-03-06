/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import FstImage from '@app/components/FstImage/FstImage'
import { colors, fonts } from '@app/theme'
import R from '@app/assets/R'
import HomeApi from './api/HomeApi'
import Empty from '@app/components/Empty/Empty'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { DEFAULT_PARAMS, SCREEN_ROUTER_APP } from '@app/constant/Constant'
import ProductApi from '../Product/api/ProductApi'
import { useDispatch } from 'react-redux'
import { getListFavoriteRest } from '../Favorite/slice/ListFavoriteRestSlice'

const { width } = Dimensions.get('window')
const ListRestaurant = (props: { search: string }) => {
  const [data, setData] = useState([])
  const refTimeout = useRef<any>()
  const dispatch = useDispatch()
  useEffect(() => {
    if (refTimeout.current) clearTimeout(refTimeout.current)

    refTimeout.current = setTimeout(() => {
      getListRest()
    }, 500)
  }, [props.search])

  const getListRest = async () => {
    showLoading()
    try {
      const res = await HomeApi.searchRest({ name: props.search })
      setData(res.data)
    } catch (error) {
    } finally {
      hideLoading()
    }
  }
  const handleLike = async (item: any) => {
    try {
      if (item.is_like) {
        await ProductApi.unLikeRestaurant({ id: item.id })
        getListRest()
        dispatch(
          getListFavoriteRest({
            page: DEFAULT_PARAMS.PAGE,
            limit: DEFAULT_PARAMS.LIMIT,
          })
        )
      } else {
        await ProductApi.likeRestaurant({ id: item.id })
        getListRest()
        dispatch(
          getListFavoriteRest({
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
            id: item.id,
          })
        }}
        style={styleListRes.v_container}
      >
        <View style={{ flexDirection: 'row' }}>
          <View>
            <View style={styleListRes.v_item}>
              <FstImage
                style={styleListRes.image}
                source={{ uri: item?.logo?.url }}
              />
            </View>
            <View style={styleListRes.v_evaluate}>
              <Text style={styleListRes.txt_evaluate}>{item?.rating}</Text>
            </View>
          </View>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 28 }}
        >
          <Text style={{ ...fonts.semi_bold15 }}>{item?.name}</Text>
          <FstImage
            style={{ width: 8, height: 8, marginLeft: 5 }}
            source={R.images.ic_tick}
          />
        </View>
        <View style={styleListRes.v_row}>
          <FstImage style={styleListRes.icon} source={R.images.ic_delivery} />
          <Text
            style={{ ...fonts.regular12, color: '#5B5B5E', marginRight: 10 }}
          >
            free
          </Text>
          <FstImage style={styleListRes.icon} source={R.images.ic_time} />
          <Text style={{ ...fonts.regular12, color: '#5B5B5E', flex: 1 }}>
            5-10 mins
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleLike(item)
          }}
          style={[
            styleListRes.icon_like,
            { backgroundColor: item.is_like ? colors.primary : colors.line },
          ]}
        >
          <FstImage
            style={{ width: 15, height: 15 }}
            source={R.images.ic_heart}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }, [])
  const keyExtractor = useCallback(item => `${item.id}`, [])
  return (
    <FlatList
      onRefresh={getListRest}
      refreshing={false}
      contentContainerStyle={{ paddingBottom: 50 }}
      style={styleListRes.v_listProduct}
      columnWrapperStyle={styleListRes.v_column}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      ListEmptyComponent={<Empty />}
    />
  )
}

export default ListRestaurant

const styleListRes = StyleSheet.create({
  icon_like: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30 / 2,
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
    padding: 11,
    marginBottom: 0,
  },
  v_item: {
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
  },
  image: {
    width: 40,
    height: 40,
  },
  v_evaluate: {
    backgroundColor: '#FFC529',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    position: 'absolute',
    right: -10,
    top: -7,
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
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
  },
  icon: { width: 12, height: 12, marginRight: 5 },
})
