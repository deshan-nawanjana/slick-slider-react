"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventData = void 0;
/**
 * Get same type of required cursor position data even in
 * different devices such as desktop and mobile
 *
 * @param event Mouse event or touch event
 * @returns Client position, page position and screen position
 */
var getEventData = function (event) {
    return 'changedTouches' in event ? event.changedTouches[0] : event;
};
exports.getEventData = getEventData;
