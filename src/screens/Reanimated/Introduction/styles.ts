import { StyleSheet } from 'react-native'

export const BOX_WIDTH: number = 100
export const BOX_HEIGHT: number = BOX_WIDTH

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    backgroundColor: 'red',
  },
})
