import R from '@app/assets/R'
import FstImage from '@app/components/FstImage/FstImage'
import { fonts, styleView } from '@app/theme'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Source } from 'react-native-fast-image'

const RowBody = ({
  img,
  title,
  action,
}: {
  img: Source
  title?: string
  action?: () => void
  code?: string
}) => {
  return (
    <TouchableOpacity onPress={action} style={styles.v_row_body}>
      <FstImage source={img} style={styles.img_row_body} />
      <Text style={styles.title_row_body} children={title} />

      <FstImage style={styles.ic_next} source={R.images.ic_next} />
    </TouchableOpacity>
  )
}
export default RowBody

const styles = StyleSheet.create({
  v_row_body: {
    ...styleView.rowItem,
    alignItems: 'center',
    padding: 15,
  },
  img_row_body: {
    width: 33,
    height: 33,
    marginRight: 10,
  },
  title_row_body: {
    flex: 1,
    marginLeft: 7,
    ...fonts.regular16,
    color: '#262626',
    lineHeight: 25,
    fontWeight: '400',
  },
  rg16_gr9: {
    ...fonts.regular16,
    color: '#262626',
    lineHeight: 25,
    marginRight: 10,
  },
  ic_next: {
    width: 25,
    height: 25,
  },
})
