/// <reference types="react" />
/**
 * Get same type of required cursor position data even in
 * different devices such as desktop and mobile
 *
 * @param event Mouse event or touch event
 * @returns Client position, page position and screen position
 */
export declare const getEventData: (event: React.MouseEvent | React.TouchEvent) => import("react").Touch | import("react").MouseEvent<Element, MouseEvent>;
