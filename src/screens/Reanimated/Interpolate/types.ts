import Animated from 'react-native-reanimated'

export type TPageProps = {
  index: number
  title: string
  translateX: Animated.SharedValue<number>
}
