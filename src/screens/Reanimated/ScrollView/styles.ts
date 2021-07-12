import { StyleSheet, Dimensions } from 'react-native'

export const PAGE_WIDTH = Dimensions.get('screen').width

export const scrollViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
})

export const pageStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: PAGE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 70,
    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 14,
  },
})
