import { SliderDataType } from "../types";
/**
 * Calculate possible slider position by bound values
 *
 * @param position Current slider translate position
 * @param data Slider data object
 * @param props Inputs configuration props from the slider component
 * @returns
 */
export declare const getPositionByBound: (position: number, data: SliderDataType, outbound: number | boolean) => number;
