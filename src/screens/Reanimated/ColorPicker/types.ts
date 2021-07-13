import { LinearGradientProps } from 'react-native-linear-gradient'

export type TColorPickerProps = Pick<
  LinearGradientProps,
  'colors' | 'start' | 'end' | 'style'
> & {
  onChangeColor: (color: string | number) => void
}

export type TPanGestureEventHandlersContext = {
  x: number
}
