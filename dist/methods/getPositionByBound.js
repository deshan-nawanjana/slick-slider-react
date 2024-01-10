"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPositionByBound = void 0;
/**
 * Calculate possible slider position by bound values
 *
 * @param position Current slider translate position
 * @param data Slider data object
 * @param props Inputs configuration props from the slider component
 * @returns
 */
var getPositionByBound = function (position, data, outbound) {
    // return if no data
    if (!data) {
        return 0;
    }
    // get bound and input values
    var min = data.bound.min;
    var max = data.bound.max;
    // switch by input type
    if (typeof outbound === 'number') {
        // get position into given bound
        if (position < min - outbound) {
            return min - outbound;
        }
        if (position > max + outbound) {
            return max + outbound;
        }
    }
    else if (!outbound) {
        // get position into default bound
        if (position < min) {
            return min;
        }
        if (position > max) {
            return max;
        }
    }
    // return same position
    return position;
};
exports.getPositionByBound = getPositionByBound;
