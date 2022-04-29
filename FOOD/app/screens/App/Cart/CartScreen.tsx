/* eslint-disable react-native/no-inline-styles */
import R from '@app/assets/R'
import Empty from '@app/components/Empty/Empty'
import FstImage from '@app/components/FstImage/FstImage'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { useAppDispatch, useAppSelector } from '@app/store'
import { colors, dimensions, fonts } from '@app/theme'
import { showConfirm } from '@app/utils/AlertHelper'
import { formatNumber } from '@app/utils/Format'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useCallback, useEffect } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import CartApi from './api/CartApi'
import { getListCart, updateQuantity } from './slice/CartSlice'

const CartScreen = () => {
  const { isLoading, isError, data, totalPrice } = useAppSelector(
    state => state.cartReducer
  )
  const dispatch = useAppDispatch()
  // const [data, setData] = useState([])
  useEffect(() => {
    dispatch(getListCart())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    showLoading()
  } else {
    hideLoading()
  }
  const handleUpdateQuantity = useCallback(
    async (food_id: number, quantity: number, index: number) => {
      const payload = {
        food_id,
        quantity,
      }
      try {
        await CartApi.updateCart(payload)
        dispatch(
          updateQuantity({
            index,
            quantity,
          })
        )
      } catch (error) {}
    },
    [dispatch]
  )

  const handleRemoveItem = useCallback(
    (food_id: number) => {
      showConfirm(
        R.strings().notification,
        'Do you want to remove this food?',
        async () => {
          showLoading()
          try {
            await CartApi.deleteCart({ food_id })
            dispatch(getListCart())
          } catch (error) {
          } finally {
            hideLoading()
          }
        }
      )
    },
    [dispatch]
  )

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <View style={styles.v_item}>
          <FstImage
            resizeMode="cover"
            style={styles.image}
            source={R.images.img_food}
          />
          <View style={styles.v_info}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={{ ...fonts.regular18, flex: 1 }}>
                {item?.food?.name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  handleRemoveItem(item.food_id)
                }}
              >
                <FstImage
                  style={{ width: 17, height: 17 }}
                  source={R.images.ic_delete}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.txt_description}>
              {item?.food?.description}
            </Text>

            <View style={styles.v_row}>
              <Text style={styles.txt_$}>
                đ
                <Text style={styles.txt_price}>
                  {formatNumber(item?.food?.price)}
                </Text>
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (item.quantity > 1) {
                    handleUpdateQuantity(item.food_id, item.quantity - 1, index)
                  }
                }}
              >
                <FstImage style={styles.ic_plus} source={R.images.ic_minus} />
              </TouchableOpacity>
              <Text style={styles.txt_quantity}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  if (item.quantity < 99) {
                    handleUpdateQuantity(item.food_id, item.quantity + 1, index)
                  }
                }}
              >
                <FstImage style={styles.ic_plus} source={R.images.ic_plus} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    },
    [handleRemoveItem, handleUpdateQuantity]
  )
  const keyExtractor = useCallback(item => `${item.food_id}`, [])

  return (
    <ScreenWrapper
      back
      unsafe
      color="black"
      titleHeader="Cart"
      backgroundHeader="white"
      forceInset={['left']}
      children={
        <View style={styles.v_container}>
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            //style={styles.v_container}
            // onRefresh={onRefreshData}
            // refreshing={false}

            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Empty />}
            // ListFooterComponent={renderFooter}
          />

          <ViewBottom
            handleOrder={() => {
              NavigationUtil.navigate(SCREEN_ROUTER_APP.CHECKOUT, {
                subTotal: totalPrice,
              })
            }}
            totalPrice={totalPrice}
          />
        </View>
      }
    />
  )
}

const ViewBottom = ({
  totalPrice,
  handleOrder,
}: {
  totalPrice: number
  handleOrder: () => void
}) => {
  return (
    <View style={styles.v_row2}>
      <View style={styles.v_final_price}>
        <Text style={styles.txt_total_money} children={`Total`} />
        <Text
          style={styles.total_price}
          children={`${formatNumber(totalPrice ? totalPrice : 0)} đ`}
        />
      </View>
      <TouchableOpacity
        onPress={handleOrder}
        style={styles.v_button2}
        children={<Text style={styles.txt_buy} children={'CHECKOUT'} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 20,
    paddingTop: 20,
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 9.11,
    elevation: 6,
  },
  v_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  v_item: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    width: 82,
    height: 82,
    borderRadius: 16,
  },
  v_info: {
    marginLeft: 20,
    justifyContent: 'space-between',
    flex: 1,
  },
  txt_description: {
    ...fonts.regular14,
    marginTop: 8,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt_price: {
    ...fonts.regular18,
    color: 'black',
  },
  txt_$: {
    ...fonts.semi_bold14,
    color: colors.primary,
    flex: 1,
  },
  ic_plus: {
    width: 24,
    height: 24,
  },
  txt_quantity: {
    ...fonts.semi_bold16,
    color: colors.primary,
    marginHorizontal: 18,
  },
  v_button: {
    alignSelf: 'center',
    marginTop: 100,
    backgroundColor: colors.primary,
    width: dimensions.width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 26,
  },
  txt_checkOut: {
    ...fonts.semi_bold16,
    color: 'white',
    marginHorizontal: 18,
  },
  v_content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  txt_label: {
    ...fonts.semi_bold16,
    flex: 1,
  },
  txt_buy: {
    fontFamily: R.fonts.san_semi_bold,
    fontSize: 16,
    color: 'white',
  },
  v_button2: {
    borderRadius: 12,
    backgroundColor: colors.primary,
    paddingVertical: 13,
    paddingHorizontal: 26,
  },
  total_price: {
    fontFamily: R.fonts.san_regular,
    fontSize: 16,
    color: colors.primary,
  },
  txt_total_money: {
    fontFamily: R.fonts.san_regular,
    fontSize: 15,
    color: '#595959',
  },
  v_final_price: {
    justifyContent: 'space-between',
    flex: 1,
  },
  v_row2: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: getBottomSpace(),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 6,
  },
})

export default CartScreen
