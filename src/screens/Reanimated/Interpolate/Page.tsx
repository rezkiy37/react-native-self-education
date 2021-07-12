import React, { FC } from 'react'
import { Dimensions, View } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { pageStyles, SIZE } from './styles'
import { TPageProps } from './types'

const { width, height } = Dimensions.get('window')

const Page: FC<TPageProps> = ({ index, translateX, title }) => {
  const inputRange: Array<number> = [
    (index - 1) * width,
    index * width,
    (index + 1) * width,
  ]

  const rSquareStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    )

    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    )
    return {
      borderRadius,
      transform: [{ scale }],
    }
  })

  const rTitleStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [-height / 2, 0, height / 2],
      Extrapolate.CLAMP,
    )

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    )
    return {
      opacity,
      transform: [{ translateY }],
    }
  })

  return (
    <View
      style={[
        pageStyles.container,
        { backgroundColor: `rgba(0, 0, 256, 0.${index + 2})` },
      ]}
    >
      <Animated.View style={[pageStyles.square, rSquareStyle]} />

      <Animated.Text style={[pageStyles.title, rTitleStyle]}>
        {title}
      </Animated.Text>
    </View>
  )
}

export default Page
