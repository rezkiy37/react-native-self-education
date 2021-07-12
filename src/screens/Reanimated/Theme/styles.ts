import { Dimensions, StyleSheet } from 'react-native'

export const SIZE: number = Dimensions.get('window').width * 0.7

export const Colors = {
  dark: {
    background: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8',
  },
  light: {
    background: '#F8F8F8',
    circle: '#FFF',
    text: '#1E1E1E',
  },
}

export const SWITCH_TRACK_COLOR = {
  true: 'rgba(256, 0, 256, 0.2)',
  false: 'rgba(0,0,0,0.1)',
}

export const themeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE / 2,
    shadowOffset: {
      height: 20,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  text: {
    fontSize: 70,
    fontWeight: '700',
    letterSpacing: 14,
  }
})
