/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import R from '@app/assets/R'
import FstImage from '@app/components/FstImage/FstImage'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { useAppSelector } from '@app/store'
import { colors, dimensions, fonts } from '@app/theme'
import { formatNumber } from '@app/utils/Format'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import ProductApi from './api/ProductApi'

interface RestaurantProps {
  route: { params: { id: number } }
}

const RestaurantDetail = (props: RestaurantProps) => {
  const { lat, long } = useAppSelector(state => state.locationReducer)
  const [categoryId, setCategoryId] = useState(0)
  const [dataRest, setDataRest] = useState<any>()
  const [dataFeaturedFood, setDataFeaturedFood] = useState<any[]>([])
  const [dataCategory, setDataCategory] = useState<any[]>([])
  const [dataFood, setDataFood] = useState<any[]>([])
  useEffect(() => {
    getDataRestaurantDetail()
  }, [])

  useEffect(() => {
    getListFood()
  }, [categoryId])

  const getDataRestaurantDetail = async () => {
    showLoading()
    try {
      const res = await ProductApi.getRestaurantDetail({
        id: props.route.params.id,
        lat: lat,
        lng: long,
      })
      const resFeaturedItem = await ProductApi.getFeaturedItem({
        id: res.data.id,
        order_by: 'rating_desc',
      })
      const resCategory = await ProductApi.getCategory({ id: res.data.id })

      const newData = resCategory.data

      newData.forEach((value, index) => {
        if (index === 0) {
          newData[index].isChecked = true
        } else {
          newData[index].isChecked = false
        }
      })

      setDataRest(res.data)
      setDataFeaturedFood(resFeaturedItem.data)
      setDataCategory([...newData])
      setCategoryId(resCategory.data[0].category_id)
    } catch (error) {
    } finally {
      hideLoading()
    }
  }

  const getListFood = async () => {
    try {
      const resListFood = await ProductApi.getListFoodCategory({
        id: dataRest.id,
        category_id: categoryId,
      })
      setDataFood(resListFood.data)
    } catch (error) {}
  }

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.FOOD_DETAIL, {
            id: item.id,
          })
        }}
        style={styleListFood.v_container}
      >
        <FstImage
          style={styleListFood.image}
          source={{ uri: item?.images?.url }}
        />
        <View style={{ marginTop: 11, paddingLeft: 10 }}>
          <Text style={{ ...fonts.semi_bold15 }}>{item?.name}</Text>
          <Text
            numberOfLines={2}
            style={{ ...fonts.regular12, color: '#5B5B5E', marginTop: 8 }}
          >
            {item?.description}
          </Text>
        </View>
        <View style={styleListFood.v_row}>
          <Text style={{ ...fonts.semi_bold14 }}>{`${formatNumber(
            item?.price
          )} $`}</Text>
        </View>
      </TouchableOpacity>
    )
  }, [])
  const keyExtractor = useCallback(item => `${item.id}`, [])
  return (
    <SafeAreaView style={styles.v_container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Banner banner={dataRest?.cover?.url} />
            <InfoRestaurant
              logo={dataRest?.logo?.url}
              name={dataRest?.name}
              address={dataRest?.address}
              rating={dataRest?.rating}
              count_rating={dataRest?.rating_count}
            />
            {dataFeaturedFood.length > 0 && (
              <ListFoodFeatured dataFeaturedFood={dataFeaturedFood} />
            )}
            {dataCategory.length > 0 && (
              <Category
                setCategoryId={setCategoryId}
                dataCategory={dataCategory}
              />
            )}
          </>
        }
        style={styleListFood.v_listProduct}
        columnWrapperStyle={styleListFood.v_column}
        data={dataFood}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </SafeAreaView>
  )
}

const InfoRestaurant = ({
  logo,
  name,
  address,
  rating,
  count_rating,
}: {
  logo: string
  name: string
  address: string
  rating: string
  count_rating: number
}) => {
  return (
    <View style={InfoResStyle.v_container}>
      <View style={InfoResStyle.v_avatar}>
        <FastImage style={InfoResStyle.avatar} source={{ uri: logo }} />
      </View>
      <Text style={{ ...fonts.semi_bold20 }}>{name}</Text>
      <Text style={{ ...fonts.regular12, color: '#9796A1', marginTop: 8 }}>
        {address}
      </Text>
      <View style={InfoResStyle.v_row}>
        <FstImage style={InfoResStyle.icon} source={R.images.ic_delivery} />
        <Text style={{ ...fonts.regular14, color: '#5B5B5E', marginRight: 10 }}>
          free delivery
        </Text>
        <FstImage style={InfoResStyle.icon} source={R.images.ic_time} />
        <Text style={{ ...fonts.regular14, color: '#5B5B5E' }}>10-15 mins</Text>
      </View>
      <View style={styles.v_row}>
        <FstImage style={styles.ic_star} source={R.images.ic_star} />
        <Text style={styles.txt_evaluate}>
          {rating} <Text style={styles.txt_number}>{`(${count_rating}+)`}</Text>
        </Text>
        <TouchableOpacity>
          <Text style={styles.txt_review}>See Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const InfoResStyle = StyleSheet.create({
  v_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  v_avatar: {
    width: 104,
    height: 104,
    borderRadius: 104 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: -50,
  },
  avatar: {
    width: 83,
    height: 83,
    borderRadius: 83 / 2,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
  },
  icon: { width: 12, height: 12, marginRight: 5 },
})

const Banner = ({ banner }: { banner: string }) => {
  return (
    <>
      <FstImage style={styles.img_banner} source={{ uri: banner }} />
      <TouchableOpacity
        onPress={() => {
          NavigationUtil.goBack()
        }}
        style={styles.v_back}
      >
        <FstImage style={styles.ic_back} source={R.images.ic_back} />
      </TouchableOpacity>
    </>
  )
}

const ListFoodFeatured = ({ dataFeaturedFood }: { dataFeaturedFood: any }) => {
  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.FOOD_DETAIL, {
            id: item.id,
          })
        }}
        style={styleListRes.v_container}
      >
        <FstImage
          style={styleListRes.image}
          source={{ uri: item?.images?.url }}
        />
        <Text style={{ ...fonts.semi_bold15, marginLeft: 15, marginTop: 15 }}>
          {item?.name}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            ...fonts.regular13,
            marginLeft: 15,
            marginTop: 10,
            color: '#5B5B5E',
          }}
        >
          {item.description}
        </Text>
        <View style={styleListRes.v_price}>
          <Text style={{ ...fonts.semi_bold14 }}>{`${formatNumber(
            item?.price
          )} đ`}</Text>
        </View>
      </TouchableOpacity>
    )
  }, [])
  const keyExtractor = useCallback(item => `${item.id}`, [])
  return (
    <View>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}
      >
        <Text style={{ ...fonts.semi_bold18, flex: 1 }}>Featured items</Text>
        <TouchableOpacity>
          <Text style={{ ...fonts.regular15, color: '#F56844' }}>
            {'View All >'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        data={dataFeaturedFood}
        keyExtractor={keyExtractor}
        horizontal
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styleListRes = StyleSheet.create({
  icon: { width: 12, height: 12, marginRight: 5 },
  image: { width: '100%', height: 150, borderRadius: 20 },
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
    width: dimensions.width * 0.7,
    paddingBottom: 15,
    marginBottom: 15,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
    paddingLeft: 15,
  },
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

const Category = ({
  dataCategory,
  setCategoryId,
}: {
  dataCategory: any
  setCategoryId: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [data, setData] = useState(JSON.parse(JSON.stringify(dataCategory)))
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data.map(item => (
        <TouchableOpacity
          onPress={() => {
            const newData = [...data]

            newData.forEach((value: any, index) => {
              if (value.category_id !== item.category_id) {
                newData[index].isChecked = false
              } else if (value.category_id === item.category_id) {
                newData[index].isChecked = true
              }
            })
            setData([...newData])
            setCategoryId(item.category_id)
          }}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#F2EAEA',
            marginRight: 12,
            backgroundColor: item.isChecked ? colors.primary : 'white',
          }}
        >
          <Text
            style={{
              ...fonts.regular14,
              color: item.isChecked ? 'white' : 'black',
            }}
          >
            {item?.category?.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styleListFood = StyleSheet.create({
  v_listProduct: {
    paddingBottom: Platform.OS === 'ios' ? 60 : 80,
    paddingHorizontal: 15,
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
    width: dimensions.width * 0.43,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1.17,
    shadowRadius: 8,
    elevation: 6,
  },
})

export default RestaurantDetail

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
    backgroundColor: 'white',
  },
  img_banner: {
    width: '100%',
    aspectRatio: 2.1,
    borderRadius: 15,
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
})
