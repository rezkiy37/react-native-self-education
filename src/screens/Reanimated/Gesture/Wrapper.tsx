import React, { FC, useState } from 'react'
import { LayoutRectangle, SafeAreaView, View } from 'react-native'
import { wrapperStyles } from './styles'
import GestureScreen from './GestureCard'
import GestureBox from './GestureBox'

const Wrapper: FC = () => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null)

  return (
    <SafeAreaView style={wrapperStyles.safeArea}>
      <View
        style={wrapperStyles.container}
        onLayout={({ nativeEvent: { layout } }) => setLayout(layout)}
      >
        {!!layout && <GestureBox width={layout.width} height={layout.height} />}
      </View>
    </SafeAreaView>
  )
}

export default Wrapper
