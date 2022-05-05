/* eslint-disable react-native/no-inline-styles */
import R from '@app/assets/R'
import FstImage from '@app/components/FstImage/FstImage'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors, fonts } from '@app/theme'
import { Tab, Tabs } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SearchBar } from 'react-native-elements'
import ListFood from './ListFood'
import ListRestaurant from './ListRestaurant'

const SearchScreen = () => {
  //biến search là một state, ta quản lý state thông qua useState
  //search là nameState, setSearch là hàm cập nhật giá trị cho biến search, còn '' là giá trị ban đầu của biến search
  const [search, setSearch] = useState<string>('')
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
      forceInset={['left']}
      titleHeader={'Search'}
      children={
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <SearchBar
            placeholder={'Find for food or restaurant...'}
            //hàm setSearch sẽ nhận dữ liệu từ hàm onChangeText để cập nhât dữ liệu cho biến search
            onChangeText={setSearch}
            value={search}
            containerStyle={styles.v_container_search}
            inputContainerStyle={styles.input_container}
            inputStyle={styles.input}
            platform={'default'}
            searchIcon={
              <FstImage
                resizeMode="contain"
                style={styles.ic_search}
                source={R.images.ic_search}
              />
            }
          />
          <Tabs
            onChangeTab={onChangeTab}
            page={page}
            initialPage={0}
            renderTabBar={() => <TabBarComponent />}
          >
            <Tab heading={'Food Item'}>
              {/* searchText là 1 props của Component ListFood, 
              ta truyền search  vào searchText 1 là truyền vào props của tk ListFood */}
              <ListFood searchText={search} />
            </Tab>

            <Tab heading={'Restaurant'}>
              <ListRestaurant search={search} />
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
        const isActive = props.activeTab == index
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

export default SearchScreen

const styles = StyleSheet.create({
  v_container_search: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: 'white',
    padding: 0,
    paddingHorizontal: 25,
  },
  input_container: {
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    paddingVertical: 6,
    paddingLeft: 10,
    borderColor: '#E7E7E7',
    borderWidth: 1,
  },
  input: {
    ...fonts.regular16,
    color: colors.colorDefault.text,
  },
  ic_search: {
    width: 24,
    height: 24,
  },
})
