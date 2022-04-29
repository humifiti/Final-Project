import R from '@app/assets/R'
import FstImage from '@app/components/FstImage/FstImage'
import { DEFAULT_PARAMS, SCREEN_ROUTER_APP } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { useAppSelector } from '@app/store'
import { colors, dimensions, fonts } from '@app/theme'
import DateUtil from '@app/utils/DateUtil'
import { formatNumber } from '@app/utils/Format'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { getListOrdered } from './slice/ListOrderedSlice'

interface ListOrderProps {
  type: number
}
const ListOrdered = (props: ListOrderProps) => {
  const dispatch = useDispatch()
  const { isLoading, isError, data, isLastPage, isLoadMore } = useAppSelector(
    state => state.listOrderedReducer
  )

  const [body, setBody] = useState({
    page: DEFAULT_PARAMS.PAGE,
    limit: DEFAULT_PARAMS.LIMIT,
  })

  var onEndReachedCalledDuringMomentum = true

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body])

  const getData = () => {
    dispatch(getListOrdered(body))
  }

  const onRefreshData = () => {
    setBody({
      ...body,
      page: DEFAULT_PARAMS.PAGE,
    })
  }
  const { type } = props

  const onMomentumScrollBegin = () => {
    onEndReachedCalledDuringMomentum = false
  }

  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum && !isLastPage && !isLoadMore) {
      setBody({
        ...body,
        page: body.page + 1,
      })
    }
  }

  if (isLoading) {
    showLoading()
  } else {
    hideLoading()
  }
  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.ORDER_DETAIL, {
            id: item.id,
          })
        }}
        style={styleListRes.v_container}
      >
        <View style={styleListRes.v_row2}>
          <View style={styleListRes.v_item}>
            <FstImage
              style={styleListRes.image}
              source={
                item.restaurant
                  ? { uri: item.restaurant.logo.url }
                  : R.images.img_pizza_hut
              }
            />
          </View>
          <View style={styleListRes.v_info}>
            <View style={styleListRes.v_row}>
              <Text style={styleListRes.txt_time}>
                {DateUtil.formatDateTime(item.created_at)}
              </Text>
              <Text style={{ ...fonts.regular16, color: colors.primary }}>
                {`${formatNumber(item.total_price)}đ`}
              </Text>
            </View>
            <View style={styleListRes.v_name}>
              <Text style={{ ...fonts.semi_bold14 }}>
                {item?.restaurant?.name}
              </Text>
              <FstImage
                style={styleListRes.img_tick}
                source={R.images.ic_tick}
              />
            </View>
            <View style={styleListRes.v_status}>
              <View style={styleListRes.v_dot2} />
              <Text style={styleListRes.txt_status}>Order Delivered</Text>
            </View>
          </View>
        </View>
        <View style={styleListRes.v_button}>
          <TouchableOpacity style={styleListRes.button1}>
            <Text style={{ ...fonts.semi_bold16 }}>
              {type === 1 ? 'Cancel' : 'Rate'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleListRes.button2}>
            <Text style={styleListRes.text}>
              {type === 1 ? 'TrackOrder' : 'Re-Order'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }, [])
  const keyExtractor = useCallback(item => `${item.id}`, [])
  return (
    <FlatList
      onRefresh={onRefreshData}
      refreshing={false}
      style={styleListRes.v_listProduct}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.1}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onEndReached={handleLoadMore}
      ListFooterComponent={
        isLoadMore ? (
          <ActivityIndicator
            color={colors.colorDefault.placeHolder}
            style={styleListRes.v_load_more}
          />
        ) : null
      }
    />
  )
}

export default ListOrdered

const styleListRes = StyleSheet.create({
  v_load_more: {
    marginVertical: 15,
  },
  img_tick: {
    width: 8,
    height: 8,
    marginLeft: 5,
  },
  v_row2: {
    flexDirection: 'row',
  },
  text: { ...fonts.semi_bold16, color: 'white' },
  v_button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    justifyContent: 'center',
  },
  v_listProduct: {
    paddingHorizontal: 25,
    paddingBottom: Platform.OS === 'ios' ? 60 : 80,
    //backgroundColor: 'red',
  },

  v_container: {
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 9,
      height: 5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    elevation: 6,
    marginTop: 20,
    //width: width * 0.4,
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
  v_info: {
    marginLeft: 18,
    flex: 1,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt_time: {
    ...fonts.regular12,
    color: '#9796A1',
    fontWeight: '400',
    marginRight: 10,
    flex: 1,
  },
  v_dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9796A1',
    marginRight: 8,
  },
  txt_count: {
    ...fonts.regular12,
    color: '#9796A1',
    fontWeight: '400',
    flex: 1,
  },
  v_name: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  v_status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  v_dot2: {
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
    backgroundColor: '#4EE476',
  },
  txt_status: {
    ...fonts.semi_bold12,
    marginLeft: 8,
    color: '#4EE476',
  },
  button1: {
    backgroundColor: 'white',
    paddingVertical: 15,
    width: dimensions.width / 2.6,
    alignItems: 'center',
    borderRadius: 25,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 9,
      height: 5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    elevation: 6,
  },
  button2: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    width: dimensions.width / 2.6,
    alignItems: 'center',
    borderRadius: 25,
  },
})
