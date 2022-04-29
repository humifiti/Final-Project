import R from '@app/assets/R'
import Empty from '@app/components/Empty/Empty'
import FstImage from '@app/components/FstImage/FstImage'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { useAppSelector } from '@app/store'
import { colors } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useCallback, useEffect } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { getListAddress } from './slice/ListAddressSlice'

interface ChooseInfoProps {
  route: {
    params: {
      isAccountScreen: boolean
      callback: ({ item }: { item: any }) => void
    }
  }
}

const DeliveryAddress = (props: any) => {
  const dispatch = useDispatch()

  const { isLoading, isError, data } = useAppSelector(
    state => state.listAddressReducer
  )
  const isAccountScreen = props?.route?.params?.isAccountScreen

  //   const [body, setBody] = useState({
  //     page: DEFAULT_PARAMS.PAGE,
  //     limit: DEFAULT_PARAMS.LIMIT,
  //   })

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getData = () => {
    dispatch(getListAddress())
  }

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            if (isAccountScreen) {
              NavigationUtil.navigate(SCREEN_ROUTER_APP.ADD_ADDRESS, {
                id: item.id,
                name: item.name,
                phone: item.phone,
                address: item.address,
                is_default: item.is_default,
                lat: item.lat,
                lng: item.lng,
              })
            } else {
              props.route?.params.callback({
                item,
              })
              NavigationUtil.goBack()
            }
          }}
          style={styles.v_item}
        >
          <FstImage
            style={styles.ic_location}
            source={
              item.is_default ? R.images.ic_location4 : R.images.ic_location3
            }
          />
          <View style={styles.v_address}>
            <Text
              style={styles.txt_info_user}
              children={`${item?.name} | ${item?.phone}`}
            />
            <Text style={styles.txt_address} children={item?.address} />
          </View>
        </TouchableOpacity>
        <View style={styles.v_line} />
      </>
    )
  }, [])
  const onRefreshData = () => {
    getData()
  }

  const keyExtractor = useCallback(item => `${item.id}`, [])

  if (isLoading) {
    showLoading()
  } else {
    hideLoading()
  }

  return (
    <ScreenWrapper
      unsafe
      color="black"
      backgroundHeader="white"
      back
      forceInset={['left']}
      titleHeader={'Delivery Address'}
      children={
        <View style={styles.v_container}>
          <TouchableOpacity
            onPress={() => {
              NavigationUtil.navigate(SCREEN_ROUTER_APP.ADD_ADDRESS)
            }}
            style={styles.v_add_address}
          >
            <FstImage
              resizeMode="contain"
              style={styles.icon}
              source={R.images.ic_add}
            />
            <Text style={styles.txt_add_address} children={'Add new address'} />
          </TouchableOpacity>
          {data.length === 0 && <Empty description={'Not found'} />}
          <FlatList
            onRefresh={onRefreshData}
            refreshing={false}
            contentContainerStyle={styles.v_list}
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
          />
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  txt_fix: {
    fontFamily: R.fonts.san_regular,
    fontSize: 15,
    color: colors.primary,
  },
  v_container: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  v_add_address: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  txt_add_address: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: R.fonts.san_regular,
    marginLeft: 11,
  },
  v_list: {
    borderRadius: 16,
    marginTop: 12,
    backgroundColor: 'white',
  },
  v_item: {
    flexDirection: 'row',
    paddingTop: 13,
    paddingBottom: 18,
    paddingLeft: 16,
    paddingRight: 19,
  },
  ic_location: {
    width: 28,
    height: 28,
  },
  v_body: {
    marginLeft: 12,
    marginTop: 4,
  },
  v_address: {
    marginLeft: 12,
    marginTop: 4,
    flex: 1,
  },
  txt_info_user: {
    fontFamily: R.fonts.san_regular,
    fontSize: 16,
    color: colors.colorDefault.text,
  },
  txt_address: {
    fontFamily: R.fonts.san_regular,
    fontSize: 16,
    marginTop: 6,
    color: '#595959',
  },
  v_line: {
    height: 1.5,
    backgroundColor: colors.backgroundColor,
  },
})

export default DeliveryAddress
