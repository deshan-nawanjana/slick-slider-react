import {
  SliderAlignmentType,
  SliderDataType,
  SliderDirectionObjectType,
  SliderDirectionType,
  SliderRefsType,
  SliderType
} from "../types"

/**
 * Calculates targets and bound values to translate the slider
 * 
 * @param refs Set of ref objects such as container and child elements
 * @param props Inputs configuration props from the slider component
 * @param direction Current slider dragging direction by the user
 * @returns Slider targets and bound values
 */
export const getSliderData = (
  refs: SliderRefsType,
  props: SliderType,
  direction: SliderDirectionType
): SliderDataType => {
  // return if any unavailable ref on inputs
  if (!refs.outer.current) { return null }
  if (!refs.inner.current) { return null }
  if (!refs.child.current.length) { return null }
  // get input prop values
  const alignment = props.alignment as SliderAlignmentType
  const dragFactor = props.dragFactor as number
  // get drag amount and direction
  const dragAmount = direction.originX - direction.cursorX
  const dragDirection = Math.abs(dragAmount) > dragFactor
    ? dragAmount > 0 ? 'left' : 'right' : 'none'
  const directionFactor = { left: 1, right: -1, none: 0 }[dragDirection] as any
  // get client rects for all refs
  const outerBound = refs.outer.current.getBoundingClientRect() as DOMRect
  const innerBound = refs.inner.current.getBoundingClientRect() as DOMRect
  const childBound = refs.child.current.map(child => child?.getBoundingClientRect()).filter(item => !!item) as DOMRect[]
  // get outer padding values
  const outerStyle = getComputedStyle(refs.outer.current)
  const outerPadLF = parseFloat(outerStyle.paddingLeft)
  const outerPadRT = parseFloat(outerStyle.paddingRight)
  const outerPadTT = outerPadLF + outerPadRT
  // get outer direction object
  const outerTargets = {
    left: outerBound.left + outerPadLF,
    right: outerBound.right + outerPadRT,
    center: (outerBound.right + outerBound.left) / 2
  } as SliderDirectionObjectType
  // get adjustment value to select suitable current slide by direction
  const dragAdjustment = (outerTargets.center - outerTargets.left - dragFactor) * directionFactor
  // map each child bound to stops
  const childStops = childBound.map((bound, index) => {
    // get positions of current child
    const lastChild = childBound[index - 1]
    const gap = lastChild ? bound.left - lastChild.right : 0
    const left = bound.left - innerBound.left
    const right = bound.right - innerBound.left
    const center = left + (bound.width / 2)
    // get child position
    const position = alignment === 'left'
      ? bound.left
      : alignment === 'right'
        ? bound.right
        : (bound.left + bound.right) / 2
    // get child anchor
    const anchor = alignment === 'left'
      ? ((left - gap) + ((left - gap) > 0 ? gap : 0)) * -1
      : alignment === 'right'
        ? (right - outerBound.width + outerPadTT) * -1
        : (center - (outerBound.width / 2) + outerPadLF) * -1
    // get child target
    const target = Math.abs(outerTargets[alignment] - position + dragAdjustment)
    // return stop item
    return ({ anchor, target })
  })
  // return data object
  return ({
    stops: childStops,
    index: childStops.findIndex(stop => childStops.every(item => stop.target <= item.target)),
    bound: {
      max: 0,
      min: (innerBound.width - (outerBound.width - outerPadTT)) * -1
    }
  })
}
