import React, { FC } from 'react'
import { Dimensions } from 'react-native'
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { pinchStyles } from './styles'

const { width, height } = Dimensions.get('window')

const uri: string =
  'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'

const Pinch: FC = () => {
  const scale = useSharedValue<number>(1)
  const focalX = useSharedValue<number>(0)
  const focalY = useSharedValue<number>(0)

  const onGestureEvent =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        console.log('onActive(): event', event)

        scale.value = interpolate(
          event.scale,
          [0.9, 10],
          [0.9, 10],
          Extrapolate.CLAMP,
        )
        focalX.value = event.focalX
        focalY.value = event.focalY
      },
      onEnd: event => {
        console.log('onEnd(): event', event)

        scale.value = withTiming(1)
        focalX.value = withTiming(0)
        focalY.value = withTiming(0)
      },
    })

  const rImageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: focalX.value },
      { translateY: focalY.value },
      { translateX: -width / 2 },
      { translateY: -height / 2 },
      { scale: scale.value },
      { translateX: -focalX.value },
      { translateY: -focalY.value },
      { translateX: width / 2 },
      { translateY: height / 2 },
    ],
  }))

  const rPinchStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
  }))

  return (
    <PinchGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={pinchStyles.container}>
        <Animated.Image
          source={{ uri }}
          style={[pinchStyles.image, rImageStyle]}
        />

        <Animated.View style={[pinchStyles.pinch, rPinchStyle]} />
      </Animated.View>
    </PinchGestureHandler>
  )
}

export default Pinch
