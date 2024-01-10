import { SliderDataType, SliderDirectionType, SliderRefsType, SliderType } from "../types";
/**
 * Calculates targets and bound values to translate the slider
 *
 * @param refs Set of ref objects such as container and child elements
 * @param props Inputs configuration props from the slider component
 * @param direction Current slider dragging direction by the user
 * @returns Slider targets and bound values
 */
export declare const getSliderData: (refs: SliderRefsType, props: SliderType, direction: SliderDirectionType) => SliderDataType;
