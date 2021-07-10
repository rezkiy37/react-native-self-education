import { StyleSheet } from 'react-native'

export const wrapperStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
})

export const CARD_WIDTH: number = 300
export const CARD_HEIGHT: number = 200

export const BOX_WIDTH: number = 50
export const BOX_HEIGHT: number = BOX_WIDTH
export const CYCLE_RADIUS: number = BOX_WIDTH * 2

export const cardStyles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: 'red',
  },
})

export const boxStyles = StyleSheet.create({
  container: {
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    borderRadius: BOX_WIDTH / 2,
    backgroundColor: 'rgba(0, 0, 256, .5)',
  },
})

export const cycleStyles = StyleSheet.create({
  container: {
    width: CYCLE_RADIUS * 2,
    height: CYCLE_RADIUS * 2,
    borderRadius: CYCLE_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 256, .5)',
  },
})
