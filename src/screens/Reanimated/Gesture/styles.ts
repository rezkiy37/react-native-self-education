import { StyleSheet } from 'react-native'

export const wrapperStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
})

export const CARD_WIDTH: number = 300
export const CARD_HEIGHT: number = 200

export const cardStyles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: 'red',
  },
})
