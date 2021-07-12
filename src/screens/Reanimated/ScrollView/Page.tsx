import React, { FC, useMemo } from 'react'
import { Text } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'
import { pageStyles, PAGE_WIDTH } from './styles'
import { TPageProps } from './types'

const Page: FC<TPageProps> = ({ title, index, translateX }) => {
  const pageOffsetX = useMemo<number>(() => index * PAGE_WIDTH, [index])

  const rContainerStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: translateX.value + pageOffsetX }],
    }),
    [pageOffsetX],
  )

  return (
    <Animated.View
      style={[
        pageStyles.container,
        { backgroundColor: `rgba(0, 0, 256, 0.${index + 2})` },
        rContainerStyle,
      ]}
    >
      <Text style={pageStyles.text}>{title}</Text>
    </Animated.View>
  )
}

export default Page
