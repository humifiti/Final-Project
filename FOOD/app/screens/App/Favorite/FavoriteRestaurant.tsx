import R from '@app/assets/R'
import Empty from '@app/components/Empty/Empty'
import FstImage from '@app/components/FstImage/FstImage'
import { DEFAULT_PARAMS } from '@app/constant/Constant'
import { useAppSelector } from '@app/store'
import { colors, fonts } from '@app/theme'
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
import { getListFavoriteRest } from './slice/ListFavoriteRestSlice'

const FavoriteRestaurant = () => {
  const dispatch = useDispatch()
  const { isLoading, isError, data, isLastPage, isLoadMore } = useAppSelector(
    state => state.listFavoritRestReducer
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
    dispatch(getListFavoriteRest(body))
  }

  const onRefreshData = () => {
    setBody({
      ...body,
      page: DEFAULT_PARAMS.PAGE,
    })
  }

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
          //   NavigationUtil.navigate(SCREEN_ROUTER_APP.FOOD_DETAIL, {
          //     id: item.id,
          //   })
        }}
        style={styles.v_container}
      >
        <FstImage style={styles.image} source={R.images.img_food_banner} />
        <Text style={styles.txt_name}>{'Cơm rang'}</Text>
        <View style={styles.v_row}>
          <FstImage style={styles.icon} source={R.images.ic_delivery} />
          <Text
            style={{ ...fonts.regular14, color: '#5B5B5E', marginRight: 10 }}
          >
            free delivery
          </Text>
          <FstImage style={styles.icon} source={R.images.ic_time} />
          <Text style={{ ...fonts.regular14, color: '#5B5B5E' }}>
            10-15 mins
          </Text>
        </View>
        <View style={styles.v_price}>
          <Text style={{ ...fonts.semi_bold20 }}>{`${formatNumber(
            10000
          )} đ`}</Text>
        </View>
      </TouchableOpacity>
    )
  }, [])

  const keyExtractor = useCallback(item => `${item.id}`, [])
  return (
    <FlatList
      onRefresh={onRefreshData}
      refreshing={false}
      style={styles.v_listProduct}
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
            style={styles.v_load_more}
          />
        ) : null
      }
      ListEmptyComponent={<Empty />}
    />
  )
}

export default FavoriteRestaurant

const styles = StyleSheet.create({
  v_load_more: {
    marginVertical: 15,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
    paddingLeft: 15,
  },
  icon: { width: 12, height: 12, marginRight: 5 },
  txt_desc: {
    ...fonts.regular14,
    marginLeft: 15,
    marginTop: 10,
    color: '#5B5B5E',
  },
  txt_name: {
    ...fonts.semi_bold18,
    marginLeft: 15,
    marginTop: 15,
  },
  v_listProduct: {
    paddingHorizontal: 25,
    paddingBottom: Platform.OS === 'ios' ? 60 : 80,
    //backgroundColor: 'red',
  },
  v_container: {
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 8,

    elevation: 6,
    marginTop: 20,
    marginRight: 15,
    width: '100%',
    paddingBottom: 15,
    marginBottom: 15,
  },
  image: { width: '100%', height: 150, borderRadius: 20 },
  v_price: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 10,
    top: 10,
    paddingHorizontal: 7,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 8,
    elevation: 6,
  },
})
