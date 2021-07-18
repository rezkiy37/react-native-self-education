import { Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('screen')

export const PICKER_WIDTH: number = width * 0.9

export const CIRCLE_SIZE: number = width * 0.8

export const CIRCLE_PICKER_SIZE: number = 45

export const INTERNAL_CIRCLE_PICKER_SIZE: number = CIRCLE_PICKER_SIZE / 1.5

export const screenStyles = StyleSheet.create({
  topContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .9)',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .9)',
  },
  picker: {
    width: PICKER_WIDTH,
    height: 40,
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
})

export const pickerStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  pickerCircle: {
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    backgroundColor: '#fff',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  internalPickerCircle: {
    width: INTERNAL_CIRCLE_PICKER_SIZE,
    height: INTERNAL_CIRCLE_PICKER_SIZE,
    borderRadius: INTERNAL_CIRCLE_PICKER_SIZE / 2,
  },
})
