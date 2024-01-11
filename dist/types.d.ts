/// <reference types="react" />
/** Slider attach alignment */
export type SliderAlignmentType = 'left' | 'center' | 'right';
/** Inputs props from the slider component */
export type SliderType = {
    /** Custom class name for slider container */
    className?: string;
    /** All child elements */
    children: JSX.Element | JSX.Element[] | undefined;
    /** Current slide index */
    index: number;
    /** Slide index change callback */
    onSlide: any;
    /** Alignment of the items when they snap */
    alignment?: SliderAlignmentType;
    /** Slider will snap to closest item or otherwise slider will stay same after dragging */
    snap?: boolean;
    /** Animation duration when slider snaps to closest item */
    snapDuration?: number;
    /** Slider will snap according to alignment even for items in the corners */
    snapOutbound?: boolean;
    /** User will be able to drag the slider or otherwise slider will only snap by index change  */
    draggable?: boolean;
    /** Slide index will callback out of the component while user dragging the slider */
    dragCallback?: boolean;
    /** User will be able to drag slider to out of container by this amount */
    dragOutbound?: boolean | number;
    /** Adjust the acceleration of snap items after dragging */
    dragFactor?: number;
};
/** Set of ref objects for elements */
export type SliderRefsType = {
    /** Ref object for outer element */
    outer: React.MutableRefObject<HTMLDivElement | null>;
    /** Ref object for inner element */
    inner: React.MutableRefObject<HTMLDivElement | null>;
    /** Ref object for child elements */
    child: React.MutableRefObject<(HTMLDivElement | null)[]>;
};
/** Set of calculated values to each direction */
export type SliderDirectionObjectType = {
    /** Left direction value */
    left: number;
    /** Right direction value */
    right: number;
    /** Centered value */
    center: number;
};
export type SliderDataType = {
    /** index of the stops item that should attach as the current slide */
    index: number;
    /** Positions and translate values array for each slide */
    stops: {
        /** Anchor position to translate and make this slide as the current slide */
        anchor: number;
        /** Distance between the slide and slider items attach position */
        target: number;
    }[];
    /** Bound values that user can drag the slider  */
    bound: {
        /** Maximum translate value inside the bound */
        max: number;
        /** Minimum translate value inside the bound */
        min: number;
    };
} | null;
/** Set of origin position when user start dragging the slider */
export type SliderOriginType = {
    /** Cursor drag start position */
    cursorX: number;
    /** Scroll position on drag start */
    scrollY: number;
    /** Slider position on drag start */
    position: number;
};
/** Slider dragging direction values by the user */
export type SliderDirectionType = {
    /** Current cursor position */
    cursorX: number;
    /** Drag start position to direction */
    originX: number;
    /** Dragging direction */
    direction: 'left' | 'right' | 'none';
};
