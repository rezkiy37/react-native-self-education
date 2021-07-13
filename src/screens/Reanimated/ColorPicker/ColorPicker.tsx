import React, { FC } from 'react'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  interpolateColor,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import {
  PanGestureHandlerGestureEvent,
  TapGestureHandlerGestureEvent,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { TColorPickerProps, TPanGestureEventHandlersContext } from './types'
import { CIRCLE_PICKER_SIZE, pickerStyles, PICKER_WIDTH } from './styles'

const ColorPicker: FC<TColorPickerProps> = ({
  colors,
  start,
  end,
  style,
  onChangeColor,
}) => {
  const translateX = useSharedValue<number>(0)
  const translateY = useSharedValue<number>(0)
  const scale = useSharedValue<number>(1)

  const adjustedTranslateX = useDerivedValue<number>(() => {
    const { min, max } = Math

    return min(max(translateX.value, 0), PICKER_WIDTH - CIRCLE_PICKER_SIZE)
  })

  const panGestureEventHandlers = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    TPanGestureEventHandlersContext
  >({
    onStart: (_, ctx) => {
      ctx.x = adjustedTranslateX.value

      translateY.value = withSpring(-CIRCLE_PICKER_SIZE - 10)
      scale.value = withSpring(1.2)
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.x
    },
    onEnd: (event, ctx) => {
      translateY.value = withSpring(0)
      scale.value = withSpring(1)
    },
  })

  const tapGestureEventHandlers =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: event => {
        translateX.value = withTiming(event.absoluteX - CIRCLE_PICKER_SIZE)

        translateY.value = withSpring(-CIRCLE_PICKER_SIZE - 10)
        scale.value = withSpring(1.2)
      },
      onEnd: () => {
        translateY.value = withSpring(0)
        scale.value = withSpring(1)
      },
    })

  const rPickerCircleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: adjustedTranslateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }))

  const rInternalPickerCircleStyle = useAnimatedStyle(() => {
    const inputRange: Array<number> = colors.map(
      (_, index) => (index / colors.length) * PICKER_WIDTH,
    )

    const backgroundColor = interpolateColor(
      adjustedTranslateX.value,
      inputRange,
      colors,
    )

    onChangeColor?.(backgroundColor)

    return {
      backgroundColor,
    }
  }, [colors])

  return (
    <TapGestureHandler onGestureEvent={tapGestureEventHandlers}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEventHandlers}>
          <Animated.View style={pickerStyles.container}>
            <LinearGradient {...{ colors, start, end, style }} />

            <Animated.View
              style={[pickerStyles.pickerCircle, rPickerCircleStyle]}
            >
              <Animated.View
                style={[
                  pickerStyles.internalPickerCircle,
                  rInternalPickerCircleStyle,
                ]}
              />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  )
}

export default ColorPicker
