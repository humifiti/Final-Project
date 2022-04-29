import { LoadingProgressRef } from '@app/components/Loading'
import { createRef } from 'react'
export const progressHolder = createRef<LoadingProgressRef>()

export const showLoading = () => {
  progressHolder.current?.show()
}

export const hideLoading = () => {
  progressHolder.current?.hide()
}
