import { LayoutRectangle } from 'react-native'

export type TGestureProps = Pick<LayoutRectangle, 'width' | 'height'>

export type TOnGestureEventContext = {
  translateX: number
  translateY: number
}
