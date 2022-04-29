/* eslint-disable react-native/no-inline-styles */
import R from '@app/assets/R'
import FstImage from '@app/components/FstImage/FstImage'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors, dimensions, fonts } from '@app/theme'
import DateUtil from '@app/utils/DateUtil'
import { formatNumber } from '@app/utils/Format'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useEffect, useState } from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import OrderApi from './api/OrderApi'

const OrderDetailScreen = (props: any) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    getDataOrder()
  }, [])

  const getDataOrder = async () => {
    showLoading()
    try {
      const res = await OrderApi.getOrderDetail({ id: props.route.params.id })
      setData(res.data)
    } catch (error) {
    } finally {
      hideLoading()
    }
  }
  return (
    <ScreenWrapper
      unsafe
      color="black"
      backgroundHeader="white"
      back
      forceInset={['left']}
      titleHeader={'Order Details'}
      children={
        <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
          <View style={styles.v_row2}>
            <View style={styles.v_item}>
              <FstImage
                style={styles.image}
                source={{ uri: data?.order?.restaurant?.logo?.url }}
              />
            </View>
            <View style={styles.v_info}>
              <View style={styles.v_row}>
                <Text style={styles.txt_time}>
                  {DateUtil.formatDateTime(data?.order.created_at)}
                </Text>
                {/* <Text style={{ ...fonts.regular16, color: colors.primary }}>
                  {`${formatNumber(10000)}đ`}
                </Text> */}
              </View>
              <View style={styles.v_name}>
                <Text style={{ ...fonts.semi_bold14 }}>
                  {data?.order?.restaurant?.name}
                </Text>
                <FstImage style={styles.img_tick} source={R.images.ic_tick} />
              </View>
              <View style={styles.v_status}>
                <View style={styles.v_dot2} />
                <Text style={styles.txt_status}>Order Delivered</Text>
              </View>
            </View>
          </View>
          <Text style={styles.txt_detail}>Details</Text>
          <Text style={styles.txt_address}>
            {data?.order?.restaurant?.address}
          </Text>
          <View style={styles.v_shipper}>
            <FstImage
              style={styles.img_shipper}
              source={R.images.img_avatar_shipper}
            />
            <View style={{ marginLeft: 18, flex: 1 }}>
              <Text style={styles.txt_id_ship}>ID: DKS-501F9</Text>
              <Text style={styles.txt_name_ship}>Farion Wick</Text>
            </View>
            <TouchableOpacity style={styles.v_button_call}>
              <View style={styles.v_icon_call}>
                <FstImage
                  style={{ width: 24, height: 24 }}
                  source={R.images.ic_phone}
                />
              </View>
              <Text style={{ ...fonts.semi_bold14, color: 'white' }}>Call</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.txt_detail}>Orders food</Text>
          {data?.order_detail.map(item => (
            <View style={{ flexDirection: 'row', marginTop: 14 }}>
              <FstImage
                style={styles.imageFood}
                source={{ uri: item.food_origin.images.url }}
              />
              <View style={{ marginLeft: 15 }}>
                <Text style={{ ...fonts.semi_bold18, flex: 1 }}>
                  {item.food_origin.name}
                </Text>
                <Text style={styles.txt_$}>
                  đ
                  <Text style={styles.txt_price}>
                    {formatNumber(item?.food_origin?.price)}
                  </Text>
                </Text>
              </View>
            </View>
          ))}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 30,
            }}
          >
            <Text style={{ ...fonts.semi_bold18, flex: 1 }}>Total</Text>
            <Text style={{ ...fonts.semi_bold18 }}>
              {`${formatNumber(data?.order?.total_price)} VND`}
            </Text>
          </View>
          <View style={styles.v_button}>
            <TouchableOpacity style={styles.button1}>
              <Text style={{ ...fonts.semi_bold16 }}>Rate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2}>
              <Text style={styles.text}>Re-Order</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      }
    />
  )
}

export default OrderDetailScreen

const styles = StyleSheet.create({
  txt_price: {
    ...fonts.regular18,
    color: 'black',
  },
  txt_$: {
    ...fonts.semi_bold14,
    color: colors.primary,
    flex: 1,
  },
  imageFood: {
    width: 92,
    height: 92,
    borderRadius: 16,
  },
  v_icon_call: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    marginRight: 8,
  },
  v_button_call: {
    backgroundColor: colors.primary,
    padding: 7,
    paddingRight: 20,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.6,
    shadowRadius: 9.11,
    elevation: 6,
  },
  txt_name_ship: {
    marginTop: 6,
    ...fonts.semi_bold16,
  },
  txt_id_ship: {
    ...fonts.regular12,
    color: '#9796A1',
  },
  v_shipper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  img_shipper: {
    width: 52,
    height: 52,
    borderRadius: 14,
  },
  txt_address: {
    ...fonts.regular14,
    marginTop: 10,
  },
  txt_detail: { ...fonts.semi_bold18, marginTop: 30 },
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
    marginTop: 35,
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
    width: dimensions.width / 2.3,
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
    width: dimensions.width / 2.3,
    alignItems: 'center',
    borderRadius: 25,
  },
})
