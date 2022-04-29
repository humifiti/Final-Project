import ReactTron from 'reactotron-react-native'

import { reactotronRedux } from 'reactotron-redux'
import { NativeModules } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import DebugConfig from './DebugConfig'

import { name } from '/app.json'
let scriptHostname = 'localhost'

if (DebugConfig.reactotron) {
  const scriptURL = NativeModules.SourceCode.scriptURL
  scriptHostname = scriptURL.split('://')[1].split(':')[0]
}

let reactotron = ReactTron.configure({ host: scriptHostname })
  .configure(name)
  .use(reactotronRedux())
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .connect()

// console.log = ReactTron

export default reactotron
