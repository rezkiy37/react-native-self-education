import React, { FC } from 'react'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated'
import Page from './Page'
import { PAGE_WIDTH, scrollViewStyles } from './styles'
import { TOnGestureEventContext } from './types'

const WORDS: Array<string> = ["What's", 'up', 'mobile', 'devs?']

const MAX_TRANSLATE_X: number = -(WORDS.length - 1) * PAGE_WIDTH

const ScrollView: FC = () => {
  const translateX = useSharedValue<number>(0)

  const clampedTranslateX = useDerivedValue(() => {
    const { max, min } = Math

    return max(min(translateX.value, 0), MAX_TRANSLATE_X)
  })

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    TOnGestureEventContext
  >({
    onStart: (_, ctx) => {
      ctx.x = clampedTranslateX.value

      cancelAnimation(translateX)
    },
    onActive: (event, ctx) => {
      console.log(event)

      translateX.value = event.translationX + ctx.x
    },
    onEnd: event => {
      translateX.value = withDecay({ velocity: event.velocityX })
    },
  })

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={scrollViewStyles.container}>
        {WORDS.map((title, index) => (
          <Page
            key={`page-${index}`}
            {...{ title, index, translateX: clampedTranslateX }}
          />
        ))}
      </Animated.View>
    </PanGestureHandler>
  )
}

export default ScrollView
