import { Linking, Platform } from 'react-native'

export const LINKING_TYPE = {
  CALL: 1,
  ZALO: 2,
  WEB: 3,
  MESSAGE: 4,
}

export const LinkingMaps = (name: any, long: any, lat: any) => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
  const latLng = `${lat},${long}`
  const label = name
  const url = Platform.select({
    ios: `https://www.google.com/maps/place/?q=${label}/@${lat},${long}`,
    android: `${scheme}${latLng}(${label})`,
  })
  Linking.canOpenURL(url as string)
    .then(supported => {
      if (!supported) {
        let browser_url =
          'https://www.google.de/maps/@' + lat + ',' + long + '?q=' + label
        return Linking.openURL(browser_url)
      } else {
        return Linking.openURL(url as string)
      }
    })
    .catch(err => console.log('error', err))
}

const LinkingUtils = (type: number, value: string) => {
  switch (type) {
    case LINKING_TYPE.WEB:
      Linking.openURL(value)
      break
    case LINKING_TYPE.CALL:
      let number = value.trim().toString()
      if (Platform.OS !== 'android') {
        number = `telprompt:${number}`
      } else {
        number = `tel:${number}`
      }
      Linking.openURL(number)
      break
    case LINKING_TYPE.ZALO:
      // const number = value.trim().toString();
      Linking.openURL(`https://zalo.me/${value.trim().toString()}`)
      break
    case LINKING_TYPE.MESSAGE:
      Linking.openURL(`https://www.facebook.com/ngthinh123`)
      break
    default:
      break
  }
}
export default LinkingUtils
