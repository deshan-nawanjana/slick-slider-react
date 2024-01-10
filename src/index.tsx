import React, { useEffect, useRef, useState } from "react"
import { SliderDirectionType, SliderOriginType, SliderType } from "./types"
import { getInputValues } from "./methods/getInputValues"
import { getSliderData } from "./methods/getSliderData"
import { getEventData } from "./methods/getEventData"
import { getPositionByBound } from "./methods/getPositionByBound"
import { outerCSS, innerCSS, childCSS } from "./style"

/**
 * Slider component
 */
export default function Slider(props: SliderType): JSX.Element {
  // get input prop values
  const options = getInputValues(props)
  // get snap options
  const snap = options.snap as boolean
  const snapDuration = options.snapDuration as number
  const snapOutbound = options.snapOutbound as boolean
  // get drag options
  const draggable = options.draggable as boolean
  const dragCallback = options.dragCallback as boolean
  const dragOutbound = options.dragOutbound as boolean
  const dragFactor = options.dragFactor as number
  // array of child elements
  const children = Array.isArray(props?.children) ? props?.children : [props?.children]
  // refs for elements
  const outerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const childRef = useRef<(HTMLDivElement | null)[]>([])
  // states for slider
  const [index, setIndex] = useState<number>(options.index || 0)
  const [position, setPosition] = useState<number>(0)
  const [origin, setOrigin] = useState<SliderOriginType>({ cursorX: 0, scrollY: 0, position: 0 })
  const [direction, setDirection] = useState<SliderDirectionType>('none')
  const [isDragging, setDragging] = useState<boolean>(false)
  const [isResizing, setResizing] = useState<boolean>(false)
  const [isScrolling, setScrolling] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [isInit, setInit] = useState<boolean>(false)
  // get animate flag
  const shouldAnimate = !isDragging && snap && isInit && !isResizing
  // method to get slider data
  const getData = () => getSliderData({
    outer: outerRef,
    inner: innerRef,
    child: childRef
  }, options, direction)
  // event on cursor down
  const onDown = (event: React.MouseEvent | React.TouchEvent) => {
    // update dragging state
    if (!draggable) { return } else { setDragging(true) }
    // store origin values
    setOrigin({
      cursorX: getEventData(event).screenX,
      scrollY: document?.documentElement?.scrollTop,
      position
    })
  }
  // event on cursor up
  const onUp = () => {
    // set current slide if user was dragging
    if (isDragging) { setSlide() }
    // reset scroll and dragging states
    setScrolling(false)
    setDragging(false)
  }
  // event on cursor drag
  const onDrag = (event: React.MouseEvent | React.TouchEvent) => {
    // return on page scroll
    if (isScrolling) { return }
    // return on page scroll start
    if (document?.documentElement?.scrollTop !== origin.scrollY) {
      setScrolling(true)
      return
    }
    // get slider data
    const data = getData()
    // get drag difference
    const dragGap = origin.cursorX - getEventData(event)?.screenX
    // update direction
    setDirection(Math.abs(dragGap) > dragFactor ? dragGap > 0 ? 'left' : 'right' : 'none')
    // get current position
    const position = getPositionByBound(origin.position - dragGap, data, dragOutbound)
    // set position
    setPosition(position)
    // callback to parent
    if (dragCallback && data) { options?.onSlide(data.index) }
  }
  // method to set slide by index
  const setSlide = (slideIndex?: number, callback?: boolean, forceLeap?: boolean) => {
    // get slide data
    const data = getData()
    // return if no data
    if (!data) { return }
    // get param values
    const resultIndex = typeof slideIndex === 'number' ? slideIndex : data.index
    const resultCallback = typeof callback === 'boolean' ? callback : true
    // get current position
    const position = getPositionByBound(data.stops[resultIndex].anchor, data, snapOutbound)
    // set current slide position
    if (snap || forceLeap) { setPosition(position) }
    // update index
    setIndex(resultIndex)
    // callback index
    if (resultCallback) { options?.onSlide(resultIndex) }
  }
  // check for slide index change from parent component
  if (!isDragging && index !== options.index) {
    // update slide by parent
    setSlide(options.index, false, true)
  }
  // method to check no slider
  const checkNoSlider = () => {
    if (!outerRef.current) { return false }
    const style = getComputedStyle(outerRef.current as any)
    const state = style?.content.includes('no-slider')
    setDisabled(state)
    return state
  }
  // effect on mount
  useEffect(() => {
    // resize event listener
    window.addEventListener('resize', () => {
      // check no slider
      if (!checkNoSlider()) {
        // set slide without animating while resize flag enabled
        setResizing(true)
        setSlide()
        setTimeout(() => setResizing(false), 100)
      }
    })
    // check no slider
    if (checkNoSlider()) {
      // immediate init
      setInit(true)
    } else {
      // set initial slide
      setSlide(index)
      // wait until slider snap to initial slide without animating
      setTimeout(() => setInit(true), 30)
    }
  }, [])
  // slider dom
  return disabled ? (
    <div className={options.className} ref={outerRef}>
      {options.children}
    </div>
  ) : (
    <div
      style={outerCSS}
      ref={outerRef}
      className={options.className}
      onMouseDown={onDown}
      onTouchStart={onDown}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchEnd={onUp}
      onTouchCancel={onUp}
      onMouseMove={event => isDragging && draggable && onDrag(event)}
      onTouchMove={event => isDragging && draggable && onDrag(event)}
      role="menuitem"
      tabIndex={0}>
      <div
        ref={innerRef}
        style={{
          transform: `translateX(${position}px)`,
          transitionDuration: `${snapDuration / 1000}s`,
          transitionProperty: shouldAnimate ? 'transform' : 'none',
          ...innerCSS
        }}
      >
        {
          children.map((child, childIndex) => (
            <div
              key={`${childIndex.toString()}`}
              ref={element => { childRef.current[childIndex] = element }}
              style={childCSS}>
              {child}
            </div>
          ))
        }
      </div>
    </div>
  )
}
