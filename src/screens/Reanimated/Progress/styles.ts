import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

export const CIRCLE_RADIUS: number = 150
export const CIRCLE_LENGTH: number = CIRCLE_RADIUS * (2 * Math.PI)

export const CX: number = width / 2
export const CY: number = height / 2
export const STROKE_COLOR: string = 'rgba(10, 0, 256, .1)'
export const INTERNAL_STROKE_COLOR: string = 'rgba(50, 0, 256, .5)'

export const progressStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(100, 0, 256, .7)',
  },
  svg: {
    position: 'absolute',
  },
  runButton: {
    width: 200,
    height: 50,

    position: 'absolute',
    bottom: 100,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 20,

    backgroundColor: 'rgba(10, 0, 256, .3)',
  },
  runButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
})
