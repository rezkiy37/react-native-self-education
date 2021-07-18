import React, { FC, useCallback } from 'react'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { View, TouchableOpacity, Text } from 'react-native'
import { Svg, Circle } from 'react-native-svg'

import { TCicleAnimatedProps } from './types'
import {
  INTERNAL_STROKE_COLOR,
  progressStyles,
  CIRCLE_RADIUS,
  CIRCLE_LENGTH,
  STROKE_COLOR,
  CX,
  CY,
} from './styles'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const Progress: FC = () => {
  const progress = useSharedValue<number>(0)

  const circleAnimatedProps = useAnimatedProps<TCicleAnimatedProps>(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }))

  const onPressRun = useCallback(() => {
    if (progress.value > 0) progress.value = withTiming(0, { duration: 2000 })
    else progress.value = withTiming(1, { duration: 2000 })
  }, [progress])

  return (
    <View style={progressStyles.container}>
      <Svg style={progressStyles.svg}>
        <AnimatedCircle
          strokeWidth={30}
          stroke={STROKE_COLOR}
          r={CIRCLE_RADIUS}
          cx={CX}
          cy={CY}
        />

        <AnimatedCircle
          strokeWidth={15}
          stroke={INTERNAL_STROKE_COLOR}
          r={CIRCLE_RADIUS}
          cx={CX}
          cy={CY}
          strokeLinecap="round"
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={circleAnimatedProps}
        />
      </Svg>

      <TouchableOpacity
        activeOpacity={0.7}
        style={progressStyles.runButton}
        onPress={onPressRun}
      >
        <Text style={progressStyles.runButtonText}>Run</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Progress
