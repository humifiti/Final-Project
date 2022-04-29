import React from 'react'
import DebugConfig from './DebugConfig'

if (process.env.NODE_ENV === 'development' && DebugConfig.wdyr) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  })
}
