import React, { FC, useCallback, useRef } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { ImageBackground } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { tabsStyles } from './styles'

const backgroundImage = require('./assets/background.jpeg')
const heartImage = require('./assets/heart.png')

const Tabs: FC = () => {
  const doubleTabGestureRef = useRef<TapGestureHandler | null>(null)
  const scale = useSharedValue<number>(0)
  const opacity = useSharedValue<number>(1)

  const onSingleTab = useCallback(() => {
    console.log('onSingleTab()')

    opacity.value = withTiming(0, { duration: 0 }, isFinished => {
      if (isFinished) {
        opacity.value = withTiming(1)
        scale.value = withSpring(0.3, { velocity: 5 }, isFinished => {
          if (isFinished) {
            scale.value = withDelay(200, withSpring(0))
            opacity.value = withDelay(
              200,
              withTiming(0, undefined, isFinished => {
                if (isFinished) opacity.value = 1
              }),
            )
          }
        })
      }
    })
  }, [])

  const onDoubleTab = useCallback(() => {
    console.log('onDoubleTab()')

    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) scale.value = withDelay(500, withSpring(0))
    })
  }, [])

  const rHeartStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: Math.max(scale.value, 0) }],
  }))

  return (
    <TapGestureHandler
      waitFor={doubleTabGestureRef}
      numberOfTaps={1}
      onActivated={onSingleTab}
    >
      <TapGestureHandler
        ref={doubleTabGestureRef}
        maxDelayMs={250}
        numberOfTaps={2}
        onActivated={onDoubleTab}
      >
        <Animated.View style={tabsStyles.container}>
          <ImageBackground
            source={backgroundImage}
            style={[tabsStyles.imageBackground]}
          >
            <Animated.Image
              source={heartImage}
              style={[tabsStyles.heartImage, rHeartStyle]}
            />
          </ImageBackground>
        </Animated.View>
      </TapGestureHandler>
    </TapGestureHandler>
  )
}

export default Tabs
