import { StyleSheet } from 'react-native'

export const pinchStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  pinch: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
  },
})
