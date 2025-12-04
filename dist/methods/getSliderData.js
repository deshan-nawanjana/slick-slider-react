"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSliderData = void 0;
/**
 * Calculates targets and bound values to translate the slider
 *
 * @param refs Set of ref objects such as container and child elements
 * @param props Inputs configuration props from the slider component
 * @param direction Current slider dragging direction by the user
 * @returns Slider targets and bound values
 */
var getSliderData = function (refs, props, direction) {
    // return if any unavailable ref on inputs
    if (!refs.outer.current) {
        return null;
    }
    if (!refs.inner.current) {
        return null;
    }
    if (!refs.child.current.length) {
        return null;
    }
    // get input prop values
    var alignment = props.alignment;
    var dragFactor = props.dragFactor;
    // get drag amount and direction
    var dragAmount = direction.originX - direction.cursorX;
    var dragDirection = Math.abs(dragAmount) > dragFactor
        ? dragAmount > 0 ? 'left' : 'right' : 'none';
    var directionFactor = { left: 1, right: -1, none: 0 }[dragDirection];
    // get client rects for all refs
    var outerBound = refs.outer.current.getBoundingClientRect();
    var innerBound = refs.inner.current.getBoundingClientRect();
    var childBound = refs.child.current.map(function (child) { return child === null || child === void 0 ? void 0 : child.getBoundingClientRect(); });
    // get outer padding values
    var outerStyle = getComputedStyle(refs.outer.current);
    var outerPadLF = parseFloat(outerStyle.paddingLeft);
    var outerPadRT = parseFloat(outerStyle.paddingRight);
    var outerPadTT = outerPadLF + outerPadRT;
    // get outer direction object
    var outerTargets = {
        left: outerBound.left + outerPadLF,
        right: outerBound.right + outerPadRT,
        center: (outerBound.right + outerBound.left) / 2
    };
    // get adjustment value to select suitable current slide by direction
    var dragAdjustment = (outerTargets.center - outerTargets.left - dragFactor) * directionFactor;
    // map each child bound to stops
    var childStops = childBound.map(function (bound, index) {
        // get positions of current child
        var lastChild = childBound[index - 1];
        var gap = lastChild ? bound.left - lastChild.right : 0;
        var left = bound.left - innerBound.left;
        var right = bound.right - innerBound.left;
        var center = left + (bound.width / 2);
        // get child position
        var position = alignment === 'left'
            ? bound.left
            : alignment === 'right'
                ? bound.right
                : (bound.left + bound.right) / 2;
        // get child anchor
        var anchor = alignment === 'left'
            ? ((left - gap) + ((left - gap) > 0 ? gap : 0)) * -1
            : alignment === 'right'
                ? (right - outerBound.width + outerPadTT) * -1
                : (center - (outerBound.width / 2) + outerPadLF) * -1;
        // get child target
        var target = Math.abs(outerTargets[alignment] - position + dragAdjustment);
        // return stop item
        return ({ anchor: anchor, target: target });
    });
    // return data object
    return ({
        stops: childStops,
        index: childStops.findIndex(function (stop) { return childStops.every(function (item) { return stop.target <= item.target; }); }),
        bound: {
            max: 0,
            min: (innerBound.width - (outerBound.width - outerPadTT)) * -1
        }
    });
};
exports.getSliderData = getSliderData;
