import React, { FC, useMemo } from 'react'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import {
  PanGestureHandlerGestureEvent,
  PanGestureHandler,
} from 'react-native-gesture-handler'
import {
  CYCLE_RADIUS,
  cycleStyles,
  BOX_HEIGHT,
  BOX_WIDTH,
  boxStyles,
} from './styles'
import { TGestureProps, TOnGestureEventContext } from './types'
import { View } from 'react-native'

const GestureBox: FC<TGestureProps> = ({ width, height }) => {
  const boundX = useMemo<number>(() => width - BOX_WIDTH, [width])
  const boundY = useMemo<number>(() => height - BOX_HEIGHT, [height])

  const translateX = useSharedValue<number>(0)
  const translateY = useSharedValue<number>(0)

  const scale = useSharedValue<number>(1)

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    TOnGestureEventContext
  >(
    {
      onStart: (_, ctx) => {
        ctx.translateX = translateX.value
        ctx.translateY = translateY.value
        scale.value = withRepeat(
          withTiming(1.2, { duration: 500, easing: Easing.ease }),
          -1,
          true,
        )
      },
      onActive: (event, ctx) => {
        translateX.value = event.translationX + ctx.translateX
        translateY.value = event.translationY + ctx.translateY
      },
      onEnd: () => {
        const distance = Math.sqrt(
          translateX.value ** 2 + translateY.value ** 2,
        )

        scale.value = withSpring(1)

        if (distance < CYCLE_RADIUS + BOX_WIDTH / 2) {
          translateX.value = withSpring(0)
          translateY.value = withSpring(0)
        }
      },
    },
    [boundX, boundY],
  )

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }))

  return (
    <View style={cycleStyles.container}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View style={[boxStyles.container, rStyle]} />
      </PanGestureHandler>
    </View>
  )
}

export default GestureBox
