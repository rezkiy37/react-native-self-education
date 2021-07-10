import React, { FC } from 'react'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import Page from './Page'
import { scrollViewStyles } from './styles'

const WORDS: Array<string> = ["What's", 'up', 'modile', 'devs?']

const ScrollViewScreen: FC = () => {
  const translateX = useSharedValue<number>(0)

  const onScroll = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x
  })

  return (
    <Animated.ScrollView
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      horizontal
      style={scrollViewStyles.container}
      scrollEventThrottle={16}
      onScroll={onScroll}
    >
      {WORDS.map((title, index) => (
        <Page
          key={index.toString()}
          translateX={translateX}
          title={title}
          index={index}
        />
      ))}
    </Animated.ScrollView>
  )
}

export default ScrollViewScreen
