import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

export const SIZE: number = width * 0.8

export const scrollViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export const pageStyles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, .4)',
  },
  title: {
    position: 'absolute',
    fontSize: 70,
    color: 'white',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
})
