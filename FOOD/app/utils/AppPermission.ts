import R from '@app/assets/R'
import { Platform } from 'react-native'
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions'
import { showConfirm } from './AlertHelper'

const FINE_LOCATION_PERMISSIONS = {
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
}

const COARSE_LOCATION_PERMISSION = {
  android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
}

const REQUEST_PERMISSION_TYPE = {
  fine_location: FINE_LOCATION_PERMISSIONS,
  coarse_location: COARSE_LOCATION_PERMISSION,
}

const PERMISSION_TYPE = {
  fine_location: 'fine_location',
  coarse_location: 'coarse_location',
}

class AppPermission {
  checkPermission = async (type: string) => {
    const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS]
    if (!permission) {
      return true
    }
    try {
      const result = await check(permission)
      console.log('app permisson', result)
      if (result === RESULTS.GRANTED) {
        return Promise.resolve(permission)
      } else {
        this.requestPermission(permission)
      }
    } catch (error) {
      return Promise.reject()
    }
  }

  requestPermission = async (permission: any) => {
    try {
      const result = await request(permission)
      console.log('requestPermission', result)
      if (result === RESULTS.GRANTED) {
        return Promise.resolve(permission)
      } else {
        showConfirm(
          R.strings().notification,
          R.strings().permission_location,
          () => {
            openSettings().catch(() => console.warn('cannot open settings'))
            return Promise.reject()
          }

          //  R.strings().agree
        )
        return Promise.reject()
      }
    } catch (error) {
      return Promise.reject()
    }
  }

  requestMultiple = async (types: any): Promise<boolean> => {
    const results = []
    for (const type of types) {
      const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS]
      if (permission) {
        const result = await this.requestPermission(permission)
        console.log('===AppPermissionUtil-Multiple===', { result, types })
        results.push(result)
      }
    }
    for (const result of results) {
      if (!result) {
        return false
      }
    }
    return true
  }
}
const Permission = new AppPermission()
export { Permission, PERMISSION_TYPE }
