import { PAGE_WIDTH } from './styles'
import { TGetTheClosestBreakpoint } from './types'

export const WORDS: Array<string> = ["What's", 'up', 'mobile', 'devs?']

export const MAX_TRANSLATE_X: number = -(WORDS.length - 1) * PAGE_WIDTH

export const PAGES_BREAKPOINTS: Array<number> = WORDS.map(
  (_, index) => index * PAGE_WIDTH,
)

export const getTheClosestBreakpoint: TGetTheClosestBreakpoint = x => {
  'worklet'

  if (x > 0) return PAGES_BREAKPOINTS[0]

  const { abs } = Math

  x = abs(x)

  return PAGES_BREAKPOINTS.reduce((a, b) => {
    return abs(b - x) < abs(a - x) ? b : a
  })
}
