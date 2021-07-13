import React, { FC, useCallback } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { View } from 'react-native'
import { TColorPickerProps } from './types'
import { screenStyles } from './styles'
import { COLORS } from './helpers'
import ColorPicker from './ColorPicker'

const Screen: FC = () => {
  const pickedColor = useSharedValue<number | string>(COLORS[0])

  const onChangeColor = useCallback<TColorPickerProps['onChangeColor']>(
    color => {
      'worklet'

      pickedColor.value = color
    },
    [],
  )

  const rCircleStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    }
  })

  return (
    <>
      <View style={screenStyles.topContainer}>
        <Animated.View style={[screenStyles.circle, rCircleStyle]} />
      </View>

      <View style={screenStyles.bottomContainer}>
        <ColorPicker
          onChangeColor={onChangeColor}
          colors={COLORS}
          style={screenStyles.picker}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>
    </>
  )
}

export default Screen
