/**
 * Get same type of required cursor position data even in
 * different devices such as desktop and mobile
 * 
 * @param event Mouse event or touch event
 * @returns Client position, page position and screen position
 */
export const getEventData = (event: React.MouseEvent | React.TouchEvent) => {
  return 'changedTouches' in event ? event.changedTouches[0] : event
}
