/* eslint-disable react-native/no-inline-styles */
import R from '@app/assets/R'
import FstImage from '@app/components/FstImage/FstImage'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors, fonts } from '@app/theme'
import { showMessages } from '@app/utils/AlertHelper'
import { formatNumber } from '@app/utils/Format'
import LinkingUtils, { LINKING_TYPE } from '@app/utils/LinkingUtils'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useEffect, useRef, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import AddressApi from '../Account/api/AddressApi'
import CartApi from './api/CartApi'

const CheckOutScreen = (props: any) => {
  const [addressDefault, setAddressDefault] = useState<any>(null)
  const [deliveryFee, setDeliveryFee] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [dataPayment, setDataPayment] = useState([
    {
      id: 1,
      namePayment: 'Momo',
      imagePayment: R.images.ic_momo,
      isSelected: false,
    },
    {
      id: 2,
      namePayment: 'Crypto',
      imagePayment: R.images.ic_coin,
      isSelected: false,
    },
  ])
  const paymentMethod = useRef(0)

  useEffect(() => {
    getAddressDefault()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAddressDefault = async () => {
    try {
      const res = await AddressApi.getAddressDefault()
      preCheckOut(res.data.id)
      setAddressDefault(res.data)
    } catch (error) {}
  }

  const preCheckOut = async (address_id: number) => {
    try {
      const res = await CartApi.preCheckOut({ address_id })
      setDeliveryFee(res.data.ship_fee)
      setTotalPrice(res.data.total_price)
    } catch (error) {}
  }
  const updateAddressUser = ({ item }: { item: any }) => {
    setAddressDefault(item)
    preCheckOut(item.id)
  }

  const checkOut = async () => {
    if (paymentMethod.current === 0) {
      showMessages(R.strings().notification, 'Please choose payment method')
      return
    }
    showLoading()
    try {
      const res =
        paymentMethod.current === 1
          ? await CartApi.checkOutByMomo({
              user_addr_id: addressDefault.id,
            })
          : await CartApi.checkOutByCrypto({
              user_addr_id: addressDefault.id,
            })
      LinkingUtils(
        LINKING_TYPE.WEB,
        paymentMethod.current === 1 ? res.data.payUrl : res.data.app
      )
      NavigationUtil.navigate(SCREEN_ROUTER_APP.ORDER)
    } catch (error) {
    } finally {
      hideLoading()
    }
  }
  const selectPayment = async (item: { id: number }) => {
    const newData = [...dataPayment]

    var indexCheck = newData.findIndex(value => value.id === item.id)

    newData[indexCheck].isSelected = true
    newData.forEach((value, index) => {
      if (index !== indexCheck) {
        newData[index].isSelected = false
      }
    })
    paymentMethod.current = item.id

    setDataPayment([...newData])
  }

  return (
    <ScreenWrapper
      back
      unsafe
      color="black"
      titleHeader="Payment"
      backgroundHeader="white"
      forceInset={['left']}
      children={
        <ScrollView style={styles.v_container}>
          <TouchableOpacity
            onPress={() => {
              NavigationUtil.navigate(SCREEN_ROUTER_APP.DELIVERY_ADDRESS, {
                callback: updateAddressUser,
              })
            }}
            style={styles.v_row}
          >
            <Text style={styles.txt_ship}>Shipping to</Text>
            <FstImage
              style={styles.ic_arrow}
              source={R.images.ic_arrow_right}
            />
          </TouchableOpacity>

          <View style={styles.v_location}>
            <FstImage style={styles.img_map} source={R.images.img_map} />
            <View style={styles.v_info}>
              <Text
                style={styles.textInfo}
              >{`${addressDefault?.name} | ${addressDefault?.phone}`}</Text>
              <Text
                style={styles.textInfo}
              >{`${addressDefault?.address}`}</Text>
            </View>
          </View>
          <Text style={styles.txt_payment}>Payment Method</Text>

          {dataPayment.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  selectPayment(item)
                }}
                style={[
                  styles.v_item_payment,
                  { borderColor: item.isSelected ? colors.primary : '#D0DBEA' },
                ]}
              >
                <FstImage
                  style={styles.imagePayment}
                  source={item.imagePayment}
                />
                <Text
                  style={[
                    styles.textPayment,
                    { color: item.isSelected ? colors.primary : '#D0DBEA' },
                  ]}
                >
                  {item.namePayment}
                </Text>
              </TouchableOpacity>
            )
          })}

          {/* <FstImage
            style={{ width: 50, height: 50, marginTop: 20, marginBottom: 30 }}
            source={R.images.ic_momo}
          /> */}
          <View style={styles.v_price}>
            <ViewRow
              label="Subtotal"
              content={`${formatNumber(props.route.params.subTotal)} đ`}
            />
            <ViewRow
              label="Delivery"
              content={`${formatNumber(deliveryFee)} đ`}
            />
            <ViewRow label="Total" content={`${formatNumber(totalPrice)} đ`} />
          </View>
          <TouchableOpacity onPress={checkOut} style={styles.v_button}>
            <Text style={styles.txt_confirm}>CONFIRM ORDER</Text>
          </TouchableOpacity>
        </ScrollView>
      }
    />
  )
}

const ViewRow = ({ label, content }: { label: string; content: string }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      }}
    >
      <Text style={{ ...fonts.regular18, fontWeight: '500', flex: 1 }}>
        {label}
      </Text>
      <Text style={{ ...fonts.regular18, fontWeight: '500' }}>{content}</Text>
    </View>
  )
}

export default CheckOutScreen

const styles = StyleSheet.create({
  textPayment: {
    ...fonts.regular18,
    fontWeight: '500',
    marginLeft: 15,
  },
  imagePayment: { width: 45, height: 45 },
  v_item_payment: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1.5,
    borderColor: '#D0DBEA',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  v_button: {
    marginBottom: 100,
    paddingHorizontal: 56,
    paddingVertical: 20,
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 28,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.6,
    shadowRadius: 9.11,
    elevation: 6,
  },
  v_price: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingTop: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 9.11,
    elevation: 6,
    borderRadius: 12,
  },
  ic_arrow: {
    width: 24,
    height: 24,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  v_container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 15 },
  txt_ship: {
    ...fonts.semi_bold18,
    flex: 1,
  },
  v_location: {
    flexDirection: 'row',
    marginTop: 20,
  },
  img_map: {
    width: 90,
    aspectRatio: 1,
  },
  textInfo: {
    ...fonts.regular18,
  },
  v_info: {
    marginLeft: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  txt_payment: {
    ...fonts.semi_bold18,
    marginTop: 40,
    marginBottom: 20,
  },
  txt_confirm: {
    ...fonts.semi_bold16,
    color: 'white',
  },
})
