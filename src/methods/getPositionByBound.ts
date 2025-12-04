import type { SliderDataType } from "../types"

/**
 * Calculate possible slider position by bound values
 * 
 * @param position Current slider translate position
 * @param data Slider data object
 * @param props Inputs configuration props from the slider component
 * @returns 
 */
export const getPositionByBound = (
  position: number,
  data: SliderDataType,
  outbound: number | boolean
): number => {
  // return if no data
  if (!data) { return 0 }
  // get bound and input values
  const min = data.bound.min
  const max = data.bound.max
  // switch by input type
  if (typeof outbound === 'number') {
    // get position into given bound
    if (position < min - outbound) { return min - outbound }
    if (position > max + outbound) { return max + outbound }
  } else if (!outbound) {
    // get position into default bound
    if (position < min) { return min }
    if (position > max) { return max }
  }
  // return same position
  return position
}
