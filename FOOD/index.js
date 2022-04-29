/**
 * @format
 */
/// <reference types="@welldone-software/why-did-you-render" />
import './app/config/wdyr' // <--- first import
if (__DEV__) {
  import('./app/config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured')
  )
}

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import 'react-native-gesture-handler'
AppRegistry.registerComponent(appName, () => App)
