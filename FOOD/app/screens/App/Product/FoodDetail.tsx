/* eslint-disable react-native/no-inline-styles */
import R from '@app/assets/R'
import FstImage from '@app/components/FstImage/FstImage'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors, fonts } from '@app/theme'
import { showConfirm, showMessages } from '@app/utils/AlertHelper'
import { formatNumber } from '@app/utils/Format'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import CartApi from '../Cart/api/CartApi'
import ProductApi from './api/ProductApi'

interface FoodProps {
  route: { params: { id: number } }
}

const FoodDetail = (props: FoodProps) => {
  const [data, setData] = useState<any>()
  const [count, setCount] = useState<number>(1)
  useEffect(() => {
    getDataFoodDetail()
  }, [])

  const getDataFoodDetail = async () => {
    showLoading()
    try {
      const res = await ProductApi.getFoodDetail({ id: props.route.params.id })
      setData(res.data)
    } catch (error) {
    } finally {
      hideLoading()
    }
  }

  const handleAddCart = async () => {
    showLoading()
    try {
      await ProductApi.addCart({ food_id: data.id, quantity: count })
      showMessages('Notification', 'Added successfully')
    } catch (error: any) {
      console.log(error?.response?.data.message)
      showConfirm(
        R.strings().notification,
        'Foods need to be in the same restaurant',
        () => {
          handleAddCartError()
        }
      )
    } finally {
      hideLoading()
    }
  }
  const handleAddCartError = async () => {
    showLoading()
    try {
      await CartApi.deleteCartAll()
      handleAddCart()
    } catch (error) {
    } finally {
      hideLoading()
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={styles.v_container}>
        <FstImage style={styles.img_banner} source={R.images.img_food_banner} />
        <TouchableOpacity
          onPress={() => {
            NavigationUtil.goBack()
          }}
          style={styles.v_back}
        >
          <FstImage style={styles.ic_back} source={R.images.ic_back} />
        </TouchableOpacity>
        <Text style={styles.txt_food}>{data?.name}</Text>
        <View style={styles.v_row}>
          <FstImage style={styles.ic_star} source={R.images.ic_star} />
          <Text style={styles.txt_evaluate}>
            {data?.rating}{' '}
            <Text style={styles.txt_number}>{`(${data?.rating_count}+)`}</Text>
          </Text>
          <TouchableOpacity>
            <Text style={styles.txt_review}>See Review</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18 }}
        >
          <Text style={{ ...fonts.semi_bold14, flex: 1 }}>
            đ
            <Text style={{ ...fonts.semi_bold26 }}>
              {formatNumber(data?.price)}
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              setCount(prevState => {
                if (prevState > 1) {
                  return prevState - 1
                }
                return 1
              })
            }}
          >
            <FstImage
              style={{ width: 32, height: 32 }}
              source={R.images.ic_minus}
            />
          </TouchableOpacity>
          <Text style={{ ...fonts.semi_bold16, marginLeft: 10 }}>{count}</Text>
          <TouchableOpacity
            onPress={() => {
              setCount(prevState => {
                return prevState + 1
              })
            }}
            style={{ marginLeft: 10 }}
          >
            <FastImage
              style={{ width: 32, height: 32 }}
              source={R.images.ic_plus}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ color: '#9796A1', ...fonts.regular15, marginTop: 19 }}>
          {data?.description}
        </Text>
      </ScrollView>
      <TouchableOpacity onPress={handleAddCart} style={styles.v_button}>
        <View style={styles.v_image}>
          <FstImage style={styles.ic_log_out} source={R.images.ic_cart2} />
        </View>

        <Text style={styles.txt_log_out}>ADD TO CART</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default FoodDetail

const styles = StyleSheet.create({
  containerCheckBox: {
    backgroundColor: 'white',
    borderWidth: 0,

    margin: 0,
  },
  ic_check: {
    width: 18,
    height: 18,
  },
  v_container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  img_banner: {
    width: '100%',
    aspectRatio: 1.56,
  },
  v_back: {
    backgroundColor: 'white',
    position: 'absolute',
    width: 38,
    height: 38,
    left: 10,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  ic_back: {
    width: 24,
    height: 24,
  },
  txt_food: {
    fontFamily: R.fonts.san_semi_bold,
    fontSize: 28,
    marginTop: 22,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  ic_star: {
    width: 18,
    height: 18,
  },
  txt_evaluate: { marginLeft: 9, ...fonts.semi_bold14 },
  txt_number: {
    color: '#9796A1',
  },
  txt_review: {
    color: '#FE724C',
    ...fonts.regular14,
    marginLeft: 7,
  },
  v_button: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginBottom: 50,
    borderRadius: 28.5,
    paddingVertical: 9,
    paddingHorizontal: 20,
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
  txt_log_out: {
    ...fonts.regular16,
    color: 'white',
    fontWeight: '500',
  },
  ic_log_out: {
    width: 17,
    height: 17,
  },
  v_image: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginRight: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
