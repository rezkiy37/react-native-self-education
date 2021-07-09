import React, { FC } from 'react'
import { SafeAreaView } from 'react-native'
import {
  PanGestureHandlerGestureEvent,
  PanGestureHandler,
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated'
import { CARD_WIDTH, CARD_HEIGHT } from './styles'
import { TGestureProps } from './types'
import Card from './Card'

const GestureScreen: FC<TGestureProps> = ({ width, height }) => {
  console.log('width', width)
  console.log('height', height)
  const boundX = width - CARD_WIDTH
  const boundY = height - CARD_HEIGHT

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetX: number
      offsetY: number
    }
  >({
    onStart: (event, ctx) => {
      ctx.offsetX = translateX.value
      ctx.offsetY = translateY.value
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.offsetX
      translateY.value = event.translationY + ctx.offsetY
    },
    onEnd: ({ velocityX, velocityY }) => {
      translateX.value = withDecay({
        velocity: velocityX,
        clamp: [0, 300],
      })
      translateY.value = withDecay({
        velocity: velocityY,
        clamp: [0, 500],
      })
    },
  })

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }))

  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View {...{ style }}>
        <Card />
      </Animated.View>
    </PanGestureHandler>
  )
}

export default GestureScreen
