import Animated from 'react-native-reanimated'

export type TPageProps = {
  title: string
  index: number
  translateX: Animated.SharedValue<number>
}

export type TOnGestureEventContext = {
  x: number
}

export type TGetTheClosestBreakpoint = (x: number) => number
