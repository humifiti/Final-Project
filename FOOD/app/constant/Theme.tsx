// import R from '@app/assets/R'
import { Dimensions, StyleSheet } from 'react-native'

const dimension = Dimensions.get('window')
const { width, height } = dimension

const colors = {
  primary: '#007DC5',
  backgroundColor: '#F9F9F9',
  white: '#ffffff',
  black: '#262626',
  focus: '#707070',
  line: '#E1E1E1',
  button: '#033654',
  headerColor: '#007DC5',
  grey: {
    dark: '#5D5D5D',
    light: '#C9C9C9',
  },
  colorDefault: {
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
    error: 'rgb(255, 59, 48)',
    info: '#ffd700',
  },
  blue: '#01579B',
  purple: {
    darker: '#1B0036',
    dark: '#300062',
    primary: '#602D90',
    light: '#915AC1',
    lighter: '#F1E0FF',
  },
  pink: {
    darker: '#943D4C',
    dark: '#C06776',
    primary: '#F596A5',
    light: '#FFC8D6',
    lighter: '#FFE5EB',
  },
  success: {
    darker: '#237804',
    dark: '#389E0D',
    primary: '#52C41A',
    light: '#B7EB8F',
  },
  warning: {
    darker: '#AD6800',
    dark: '#D48806',
    primary: '#FAAD14',
    light: '#FFE58F',
  },
  error: {
    darker: '#A8071A',
    dark: '#CF1322',
    primary: '#FF4D4F',
    light: '#FFA39E',
  },
  text: {
    primary: '#212B36',
    light: '#454F5B',
    lighter: '#637381',
    lightest: '#919EAB',
    black: '#262626',
    otp: '#0EBE7F',
    light_black: '#033654',
    greyish: '#F5F5F5',
    gray: '#8C8C8C',
    dark_green: '#033654',
    category: '#69747E',
    charcoal: '#425369',
    button: '#595959',
  },
  background_fab: {
    phone: '#00A8FF',
    mail: '#F1636A',
    message: '#027FFF',
    facebook: '#139CF7',
    zalo: '#0C93E5',
  },
}

const sizes = {}

const fonts = {
  // regular12: {
  //   fontSize: 12,
  //   lineHeight: 16,
  //   fontFamily: R.fonts.regular,
  // },
  // regular14: {
  //   fontSize: 14,
  //   lineHeight: 18,
  //   fontFamily: R.fonts.regular,
  // },

  // regular15: {
  //   fontSize: 15,
  //   lineHeight: 19,
  //   fontFamily: R.fonts.regular,
  // },
  // regular16: {
  //   fontSize: 16,
  //   lineHeight: 20,
  //   fontFamily: R.fonts.regular,
  // },
  // regular18: {
  //   fontSize: 18,
  //   lineHeight: 22,
  //   fontFamily: R.fonts.regular,
  // },
  // regular20: {
  //   fontSize: 20,
  //   lineHeight: 24,
  //   fontFamily: R.fonts.regular,
  // },
  // regular24: {
  //   fontSize: 24,
  //   lineHeight: 28,
  //   fontFamily: R.fonts.regular,
  // },
  // bold10: {
  //   fontSize: 10,
  //   lineHeight: 16,
  //   fontFamily: R.fonts.bold,
  // },
  // bold12: {
  //   fontSize: 12,
  //   lineHeight: 16,
  //   fontFamily: R.fonts.bold,
  // },
  // bold14: {
  //   fontSize: 14,
  //   lineHeight: 18,
  //   fontFamily: R.fonts.bold,
  // },
  // bold16: {
  //   fontSize: 16,
  //   lineHeight: 20,
  //   fontFamily: R.fonts.bold,
  // },
  // bold18: {
  //   fontSize: 18,
  //   lineHeight: 22,
  //   fontFamily: R.fonts.bold,
  // },
  // bold20: {
  //   fontSize: 20,
  //   lineHeight: 24,
  //   fontFamily: R.fonts.bold,
  // },
  // bold24: {
  //   fontSize: 24,
  //   lineHeight: 28,
  //   fontFamily: R.fonts.bold,
  // },
  // semi_bold12: {
  //   fontSize: 12,
  //   lineHeight: 16,
  //   fontFamily: R.fonts.semi_bold,
  // },
  // semi_bold14: {
  //   fontSize: 14,
  //   lineHeight: 18,
  //   fontFamily: R.fonts.semi_bold,
  // },
  // semi_bold16: {
  //   fontSize: 16,
  //   lineHeight: 20,
  //   fontFamily: R.fonts.semi_bold,
  // },
  // semi_bold18: {
  //   fontSize: 18,
  //   lineHeight: 22,
  //   fontFamily: R.fonts.semi_bold,
  // },
  // semi_bold20: {
  //   fontSize: 20,
  //   lineHeight: 24,
  //   fontFamily: R.fonts.semi_bold,
  // },
  // semi_bold24: {
  //   fontSize: 24,
  //   lineHeight: 28,
  //   fontFamily: R.fonts.semi_bold,
  // },

  // semi_bold28: {
  //   fontSize: 28,
  //   lineHeight: 36,
  //   fontFamily: R.fonts.semi_bold,
  // },
  // light12: {
  //   fontSize: 12,
  //   lineHeight: 16,
  //   fontFamily: R.fonts.light,
  // },
  // light14: {
  //   fontSize: 14,
  //   lineHeight: 18,
  //   fontFamily: R.fonts.light,
  // },
  // light16: {
  //   fontSize: 16,
  //   lineHeight: 20,
  //   fontFamily: R.fonts.light,
  // },
  // light18: {
  //   fontSize: 18,
  //   lineHeight: 22,
  //   fontFamily: R.fonts.light,
  // },
  // light20: {
  //   fontSize: 20,
  //   lineHeight: 24,
  //   fontFamily: R.fonts.light,
  // },
  // light24: {
  //   fontSize: 24,
  //   lineHeight: 28,
  //   fontFamily: R.fonts.light,
  // },
  // medium12: {
  //   fontSize: 12,
  //   lineHeight: 16,
  //   fontFamily: R.fonts.medium,
  // },
  // medium14: {
  //   fontSize: 14,
  //   lineHeight: 18,
  //   fontFamily: R.fonts.medium,
  // },
  // medium16: {
  //   fontSize: 16,
  //   lineHeight: 20,
  //   fontFamily: R.fonts.medium,
  // },
  // medium18: {
  //   fontSize: 18,
  //   lineHeight: 22,
  //   fontFamily: R.fonts.medium,
  // },
  // medium20: {
  //   fontSize: 20,
  //   lineHeight: 24,
  //   fontFamily: R.fonts.medium,
  // },
  // medium24: {
  //   fontSize: 24,
  //   lineHeight: 28,
  //   fontFamily: R.fonts.medium,
  // },
  // roboto-medium
  roboto_medium16: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  // quicksand_bold
  quicksand_bold16: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
  },
  quicksand_bold14: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
  },
}

// export const fonts = {
//   regular12: {
//     fontSize: moderateScale(12),
//     fontFamily: R.fonts.sf_regular,
//   },
//   regular13: {
//     fontSize: moderateScale(13),
//     fontFamily: R.fonts.sf_regular,
//   },
//   regular14: {
//     fontSize: moderateScale(14),
//     fontFamily: R.fonts.sf_regular,
//   },
//   regular15: {
//     fontSize: moderateScale(15),
//     fontFamily: R.fonts.sf_regular,
//   },
//   regular16: {
//     fontSize: moderateScale(16),
//     fontFamily: R.fonts.sf_regular,
//   },
//   regular17: {
//     fontSize: moderateScale(17),
//     fontFamily: R.fonts.sf_regular,
//   },
//   regular18: {
//     fontSize: moderateScale(18),
//     fontFamily: R.fonts.sf_regular,
//   },
//   regular20: {
//     fontSize: moderateScale(20),
//     fontFamily: R.fonts.sf_regular,
//   },
//   regular24: {
//     fontSize: moderateScale(24),
//     fontFamily: R.fonts.sf_regular,
//   },

//   regular28: {
//     fontSize: moderateScale(28),
//     fontFamily: R.fonts.sf_regular,
//   },
//   bold12: {
//     fontSize: moderateScale(12),
//     fontFamily: R.fonts.sf_bold,
//   },
//   bold14: {
//     fontSize: moderateScale(14),
//     fontFamily: R.fonts.sf_bold,
//   },
//   bold16: {
//     fontSize: moderateScale(16),
//     fontFamily: R.fonts.sf_bold,
//   },
//   bold18: {
//     fontSize: moderateScale(18),
//     fontFamily: R.fonts.sf_bold,
//   },
//   bold20: {
//     fontSize: moderateScale(20),
//     fontFamily: R.fonts.sf_bold,
//   },
//   bold24: {
//     fontSize: moderateScale(24),
//     fontFamily: R.fonts.sf_bold,
//   },
//   semi_bold12: {
//     fontSize: moderateScale(12),
//     fontFamily: R.fonts.sf_semi_bold,
//   },
//   semi_bold14: {
//     fontSize: moderateScale(14),
//     fontFamily: R.fonts.sf_semi_bold,
//   },
//   semi_bold15: {
//     fontSize: moderateScale(15),
//     fontFamily: R.fonts.sf_semi_bold,
//   },
//   semi_bold16: {
//     fontSize: moderateScale(16),
//     fontFamily: R.fonts.sf_semi_bold,
//   },
//   semi_bold17: {
//     fontSize: moderateScale(17),
//     fontFamily: R.fonts.sf_semi_bold,
//   },
//   semi_bold18: {
//     fontSize: moderateScale(18),
//     fontFamily: R.fonts.sf_semi_bold,
//   },
//   semi_bold20: {
//     fontSize: moderateScale(20),
//     fontFamily: R.fonts.sf_semi_bold,
//   },
//   semi_bold24: {
//     fontSize: moderateScale(24),
//     fontFamily: R.fonts.sf_semi_bold,
//   },
//   light12: {
//     fontSize: moderateScale(12),
//     fontFamily: R.fonts.sf_light,
//   },
//   light14: {
//     fontSize: moderateScale(14),
//     fontFamily: R.fonts.sf_light,
//   },
//   light16: {
//     fontSize: moderateScale(16),
//     fontFamily: R.fonts.sf_light,
//   },
//   light18: {
//     fontSize: moderateScale(18),
//     fontFamily: R.fonts.sf_light,
//   },
//   light20: {
//     fontSize: moderateScale(20),
//     fontFamily: R.fonts.sf_light,
//   },
//   light24: {
//     fontSize: moderateScale(24),
//     fontFamily: R.fonts.sf_light,
//   },
// }

const ratio = (width / 414 / height) * 1000

const widthRatio = width / 500
const heightRatio = height / 500

const dimensionUI = {
  height,
  width,
  ratio,
  widthRatio,
  heightRatio,
}

const styles = StyleSheet.create({
  androidSafeView: {
    flex: 1,
  },

  test: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },

  menu: {
    flex: 1,
    height: width * 0.25,
  },

  scrollHoz: {
    width: width * 0.9,
    height: height * 0.3,
    backgroundColor: colors.white,
    borderRadius: 15,
  },
  directionRow: { flexDirection: 'row' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
  line: { height: 0.7, backgroundColor: '#D9D9D9', marginTop: 10 },
})

export { colors, sizes, fonts, styles, dimension, dimensionUI }
const theme = { colors, sizes, fonts, styles, dimension }
export default theme
