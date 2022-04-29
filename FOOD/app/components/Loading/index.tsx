import React, { forwardRef, useImperativeHandle, memo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'

import equals from 'react-fast-compare'
import { WaveIndicator } from 'react-native-indicators'
import { colors, dimensions } from '@app/theme'

export interface LoadingProgressProps {
  color?: string
  backgroundColor?: string
  underStatusbar?: boolean
}
const LoadingProgressComponent = forwardRef((_: LoadingProgressProps, ref) => {
  const [visible, setVisible] = useState(false)
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setVisible(true)
      },
      hide: () => {
        setVisible(false)
      },
    }),
    []
  )

  return (
    <Modal
      style={styles.container}
      isVisible={visible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropColor="#000000aa"
    >
      <View
        style={{
          backgroundColor: 'white',
          width: '20%',
          aspectRatio: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: dimensions.width * 0.3,
        }}
      >
        <WaveIndicator
          color={colors.primary}
          count={3}
          size={dimensions.width * 0.13}
        />
      </View>
    </Modal>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export const LoadingProgress = memo(LoadingProgressComponent, equals)
export interface LoadingProgressRef {
  show(): void
  hide(): void
}
