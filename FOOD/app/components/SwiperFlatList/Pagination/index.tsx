import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ViewPropTypes, Animated } from 'react-native'

import { colors, horizontal } from '../theme'
import theme from '@app/constant/Theme'

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // flexDirection: 'row',
    // marginVertical: vertical.xxSmall,
    // justifyContent: 'center',
    // bottom: 0,
    // width: '100%'
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  pagination: {
    width: horizontal.small,
    height: horizontal.small,
    borderRadius: 25,
    marginHorizontal: horizontal.xSmall,
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 4,
  },
})
interface State {
  size: any
  // paginationIndex,
  // scrollToIndex,
  // paginationDefaultColor,
  // paginationActiveColor,
  paginationStyle: any
  // paginationStyleItem,
  scrollX: any
  windowWidth: any
}
const Pagination = (props: State) => {
  const { paginationStyle, scrollX, size, windowWidth } = props
  return (
    <Animated.View style={[styles.container, paginationStyle]}>
      {Array.from({ length: size }).map((_, index) => {
        const width = scrollX.interpolate({
          inputRange: [
            windowWidth * (index - 1),
            windowWidth * index,
            windowWidth * (index + 1),
          ],
          outputRange: [8, 16, 8],
          extrapolate: 'clamp',
        })
        return (
          <>
            {/* <TouchableOpacity
            style={[
              styles.pagination,
              paginationStyleItem,
              paginationIndex === index ? { backgroundColor: paginationActiveColor } : { backgroundColor: paginationDefaultColor }
            ]}
            key={index}
            onPress={() => scrollToIndex({ index })}
          /> */}
            <Animated.View key={index} style={[styles.normalDot, { width }]} />
          </>
        )
      })}
    </Animated.View>
  )
}
Pagination.propTypes = {
  scrollToIndex: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  paginationIndex: PropTypes.number,
  paginationActiveColor: PropTypes.string,
  paginationDefaultColor: PropTypes.string,
  paginationStyle: ViewPropTypes.style,
  paginationStyleItem: ViewPropTypes.style,
}

Pagination.defaultProps = {
  paginationIndex: 0,
  paginationActiveColor: colors.white,
  paginationDefaultColor: colors.gray,
  paginationStyle: {},
  paginationStyleItem: {},
}

export default Pagination
