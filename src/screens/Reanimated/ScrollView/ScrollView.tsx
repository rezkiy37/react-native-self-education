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
  withSpring,
} from 'react-native-reanimated'
import {
  getTheClosestBreakpoint,
  MAX_TRANSLATE_X,
  PAGES_BREAKPOINTS,
  WORDS,
} from './helpers'
import Page from './Page'
import { scrollViewStyles } from './styles'
import { TOnGestureEventContext } from './types'

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
      translateX.value = event.translationX + ctx.x
    },
    onEnd: (event, ctx) => {
      translateX.value = withSpring(
        -getTheClosestBreakpoint(event.translationX + ctx.x),
      )
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
