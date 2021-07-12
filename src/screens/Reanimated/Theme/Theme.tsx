import React, { FC, useState } from 'react'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import { Switch } from 'react-native'
import { ETheme } from './types'
import { themeStyles, Colors, SWITCH_TRACK_COLOR } from './styles'

const Theme: FC = () => {
  const [theme, setTheme] = useState<ETheme>(ETheme.light)

  const progress = useDerivedValue(() => {
    return theme === ETheme.dark ? withTiming(1) : withTiming(0)
  }, [theme])

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text],
    )
    return { color }
  })

  const rContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background],
    )
    return { backgroundColor }
  })

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle],
    )
    return { backgroundColor }
  })

  return (
    <Animated.View style={[themeStyles.container, rContainerStyle]}>
      <Animated.Text style={[themeStyles.text, rTextStyle]}>
        Theme
      </Animated.Text>

      <Animated.View style={[themeStyles.circle, rCircleStyle]}>
        <Switch
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor="violet"
          value={theme === ETheme.dark}
          onValueChange={toggled =>
            setTheme(toggled ? ETheme.dark : ETheme.light)
          }
        />
      </Animated.View>
    </Animated.View>
  )
}

export default Theme
