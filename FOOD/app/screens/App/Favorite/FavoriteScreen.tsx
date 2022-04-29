/* eslint-disable react-native/no-inline-styles */
import R from '@app/assets/R'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors } from '@app/theme'
import { Tab, Tabs } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FavoriteFood from './FavoriteFood'
import FavoriteRestaurant from './FavoriteRestaurant'

const FavoriteScreen = () => {
  const [page, setPage] = useState(0)
  const onChangeTab = (changeTabProps: { i: number }) => {
    const newTabIndex = changeTabProps.i
    setPage(newTabIndex)
  }
  return (
    <ScreenWrapper
      color="black"
      backgroundHeader="white"
      back
      onPressButtonBack={() => {
        NavigationUtil.navigate(SCREEN_ROUTER_APP.USER)
      }}
      forceInset={['left']}
      titleHeader={'Favorites'}
      children={
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Tabs
            onChangeTab={onChangeTab}
            page={page}
            initialPage={0}
            renderTabBar={() => <TabBarComponent />}
          >
            <Tab heading={'Food Items'}>
              <FavoriteFood />
            </Tab>
            <Tab heading={'Restaurant'}>
              <FavoriteRestaurant />
            </Tab>
          </Tabs>
        </View>
      }
    />
  )
}

const TabBarComponent = (props: any) => {
  return (
    <View style={tabbar_styles.container}>
      {props.tabs.map((value: any, index: number) => {
        const isActive = props.activeTab === index
        return (
          <TouchableOpacity
            key={index}
            accessible={true}
            accessibilityLabel={value}
            onPress={() => props.goToPage(index)}
            style={[
              tabbar_styles.tab,
              {
                backgroundColor: isActive ? colors.primary : 'white',
                borderRadius: isActive ? 23.5 : 0,
              },
            ]}
          >
            <Text
              numberOfLines={1}
              style={[
                tabbar_styles.title,
                isActive && {
                  color: 'white',
                  fontFamily: R.fonts.san_semi_bold,
                },
              ]}
              children={value}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
const tabbar_styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 6,
    borderColor: '#F2EAEA',
    borderWidth: 1,
    borderRadius: 27.5,
    paddingVertical: 4,
    //paddingBottom: 20,
    marginTop: 23,
    marginHorizontal: 25,
  },
  tab: {
    backgroundColor: 'white',
    marginRight: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 17,
  },
  title: {
    fontFamily: R.fonts.san_regular,
    fontSize: 15,
    color: colors.primary,
  },
})

export default FavoriteScreen
