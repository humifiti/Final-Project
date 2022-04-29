/* eslint-disable react-native/no-inline-styles */
import R from '@app/assets/R'
import FstImage from '@app/components/FstImage/FstImage'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { updateLocation } from '@app/screens/locationReducer'
import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import { useAppSelector } from '@app/store'
import { colors, fonts } from '@app/theme'
import { Permission, PERMISSION_TYPE } from '@app/utils/AppPermission'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { useDispatch } from 'react-redux'
import { getDataUserInfo } from '../Account/slice/AccountSlice'
import HomeApi from './api/HomeApi'
const { width } = Dimensions.get('window')
const HomeScreen = () => {
  const dispatch = useDispatch()
  const [categoryId, setCategoryId] = useState(0)
  useEffect(() => {
    getDataUser()
    requestPermission()
  }, [])

  const requestPermission = async () => {
    const token = await AsyncStorageService.getToken()
    if (token) {
      await Permission.requestMultiple([
        PERMISSION_TYPE.fine_location,
        PERMISSION_TYPE.coarse_location,
      ])
      getLocation()
    }
  }

  const getDataUser = async () => {
    const token = await AsyncStorageService.getToken()
    if (token) {
      dispatch(getDataUserInfo())
    }
  }

  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('current location', position)
        dispatch(
          updateLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          })
        )
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    )
  }

  return (
    <SafeAreaView style={styles.v_container}>
      <ScrollView
        style={styles.v_container}
        refreshControl={<RefreshControl refreshing={false} />}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.txt_title}>What would you like to order</Text>
        <Search />
        <Category setCategoryId={setCategoryId} />
        <ListRestaurant categoryId={categoryId} />
        <ListFood />
      </ScrollView>
    </SafeAreaView>
  )
}

const Search = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationUtil.navigate(SCREEN_ROUTER_APP.SEARCH)
      }}
      style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}
    >
      <View style={styleSearch.v_container}>
        <FstImage style={styleSearch.ic_search} source={R.images.ic_search} />
        <Text style={styleSearch.text}> Find for food or restaurant...</Text>
      </View>
    </TouchableOpacity>
  )
}

const styleSearch = StyleSheet.create({
  v_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    paddingVertical: 17,
    paddingHorizontal: 18,
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E7E7E7',
  },
  ic_search: {
    width: 24,
    height: 24,
  },
  text: {
    color: '#9DA4BB',
    marginLeft: 14,
    ...fonts.regular14,
  },
})

const Category = ({
  setCategoryId,
}: {
  setCategoryId: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [dataCategory, setDataCategory] = useState([])

  useEffect(() => {
    getDataCategory()
  }, [])

  const getDataCategory = async () => {
    showLoading()
    try {
      const res = await HomeApi.getCategory()
      const newData = res.data

      newData.forEach((value, index) => {
        if (index === 0) {
          newData[index].isChecked = true
        } else {
          newData[index].isChecked = false
        }
      })
      setDataCategory([...newData])
      setCategoryId(res.data[0].id)
    } catch (error) {
    } finally {
      hideLoading()
    }
  }

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          const newData = [...dataCategory]

          newData.forEach((value: any, index) => {
            if (value.id !== item.id) {
              newData[index].isChecked = false
            } else if (value.id === item.id) {
              newData[index].isChecked = true
            }
          })
          setDataCategory([...newData])
          setCategoryId(item.id)
        }}
        style={[
          styleCategory.v_item,
          {
            backgroundColor: item.isChecked ? colors.primary : 'white',
          },
        ]}
      >
        <FstImage
          style={styleCategory.icon}
          source={{ uri: item?.icon?.url }}
        />
        <Text
          numberOfLines={2}
          style={[
            styleCategory.text,
            {
              color: item.isChecked ? 'white' : colors.text.primary,
            },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  }
  const keyExtractor = useCallback(item => `${item.id}`, [])
  return (
    <FlatList
      maxToRenderPerBatch={10}
      initialNumToRender={10}
      data={dataCategory}
      keyExtractor={keyExtractor}
      horizontal
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
  )
}
const styleCategory = StyleSheet.create({
  v_item: {
    // height: 98,
    width: 59,
    backgroundColor: 'white',
    marginLeft: 15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 10,
    marginTop: 20,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  text: {
    marginTop: 15,
    ...fonts.regular11,
    color: '#67666D',
    textAlign: 'center',
    marginHorizontal: 5,
  },
})

const ListRestaurant = ({ categoryId }: { categoryId: number }) => {
  const { lat, long } = useAppSelector(state => state.locationReducer)
  const [dataRes, setDataRes] = useState([])

  useEffect(() => {
    getDataRestaurant()
  }, [long, lat, categoryId])

  const getDataRestaurant = async () => {
    showLoading()
    try {
      const res = await HomeApi.getRestaurant({
        category: categoryId,
        lat: lat,
        lng: long,
      })
      setDataRes(res.data)
    } catch (error) {
    } finally {
      hideLoading()
    }
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
        <FstImage
          style={styleListRes.image}
          source={{ uri: item?.logo?.url }}
        />
        <View style={styleListRes.v_row}>
          <Text style={{ ...fonts.semi_bold15, marginRight: 5 }}>
            {item?.name}
          </Text>
          <FstImage style={styleListRes.icon} source={R.images.ic_tick} />
        </View>
        <View style={styleListRes.v_row}>
          <FstImage style={styleListRes.icon} source={R.images.ic_delivery} />
          <Text
            style={{ ...fonts.regular14, color: '#5B5B5E', marginRight: 10 }}
          >
            free delivery
          </Text>
          <FstImage style={styleListRes.icon} source={R.images.ic_time} />
          <Text style={{ ...fonts.regular14, color: '#5B5B5E' }}>
            10-15 mins
          </Text>
        </View>
      </TouchableOpacity>
    )
  }, [])
  const keyExtractor = useCallback(item => `${item.id}`, [])
  return (
    <View>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
      >
        <Text style={{ ...fonts.semi_bold18, flex: 1 }}>
          Featured restaurants
        </Text>
        <TouchableOpacity>
          <Text style={{ ...fonts.regular15, color: '#F56844' }}>
            {'View All >'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        data={dataRes}
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
    width: width * 0.7,
    paddingBottom: 15,
    marginBottom: 15,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
    paddingLeft: 15,
  },
})

const ListFood = () => {
  const [dataFood, setDataFood] = useState([])
  useEffect(() => {
    getDataFood()
  }, [])

  const getDataFood = async () => {
    showLoading()
    try {
      const res = await HomeApi.getFood({ order_by: 'rating_desc' })
      setDataFood(res.data)
    } catch (error) {
    } finally {
      hideLoading()
    }
  }

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.FOOD_DETAIL)
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
      </TouchableOpacity>
    )
  }, [])
  const keyExtractor = useCallback(item => `${item.id}`, [])
  return (
    <View>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
      >
        <Text style={{ ...fonts.semi_bold18, flex: 1 }}>Popular items</Text>
      </View>
      <FlatList
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        data={dataFood}
        keyExtractor={keyExtractor}
        horizontal
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styleListFood = StyleSheet.create({
  icon: { width: 12, height: 12, marginRight: 5 },
  image: { width: '100%', aspectRatio: 1, borderRadius: 15 },
  v_container: {
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 6,
    marginTop: 20,
    marginRight: 15,
    width: width * 0.4,
    paddingBottom: 15,
    marginBottom: 20,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
    paddingLeft: 15,
  },
})

const styles = StyleSheet.create({
  v_container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  txt_title: {
    ...fonts.semi_bold26,
    marginTop: 10,
  },
})

export default HomeScreen
