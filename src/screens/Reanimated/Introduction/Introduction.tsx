import React, { FC, useEffect } from 'react'
import { SafeAreaView, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated'
import { styles, BOX_WIDTH } from './styles'

const ANIMATION_DURATION: number = 1000 * 3

const computeRotation = (progress: Animated.SharedValue<number>): string => {
  'worklet'

  return `${progress.value * 2 * Math.PI}rad`
}

const computeBorderRadius = (
  progress: Animated.SharedValue<number>,
): number => {
  'worklet'

  return (progress.value * BOX_WIDTH) / 2
}

const Introduction: FC = () => {
  const progress = useSharedValue<number>(0.8)
  const scale = useSharedValue<number>(1)

  const reanimatedStyle = useAnimatedStyle(
    () => ({
      opacity: progress.value,
      transform: [
        { scale: scale.value },
        { rotate: computeRotation(progress) },
      ],
      borderRadius: computeBorderRadius(progress),
    }),
    [progress, scale],
  )

  useEffect(() => {
    progress.value = withRepeat(withSpring(1), -1, true)

    scale.value = withRepeat(withSpring(2), -1, true)
  }, [])

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <View style={[styles.container]}>
        <Animated.View style={[styles.box, reanimatedStyle]} />
      </View>
    </SafeAreaView>
  )
}

export default Introduction
