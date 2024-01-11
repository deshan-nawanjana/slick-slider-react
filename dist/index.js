"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var getInputValues_1 = require("./methods/getInputValues");
var getSliderData_1 = require("./methods/getSliderData");
var getEventData_1 = require("./methods/getEventData");
var getPositionByBound_1 = require("./methods/getPositionByBound");
var style_1 = require("./style");
/**
 * Slider component
 */
function Slider(props) {
    // get input prop values
    var options = (0, getInputValues_1.getInputValues)(props);
    // get snap options
    var snap = options.snap;
    var snapDuration = options.snapDuration;
    var snapOutbound = options.snapOutbound;
    // get drag options
    var draggable = options.draggable;
    var dragCallback = options.dragCallback;
    var dragOutbound = options.dragOutbound;
    // array of child elements
    var children = Array.isArray(props === null || props === void 0 ? void 0 : props.children) ? props === null || props === void 0 ? void 0 : props.children : [props === null || props === void 0 ? void 0 : props.children];
    // refs for elements
    var outerRef = (0, react_1.useRef)(null);
    var innerRef = (0, react_1.useRef)(null);
    var childRef = (0, react_1.useRef)([]);
    // states for slider
    var _a = (0, react_1.useState)(options.index || 0), index = _a[0], setIndex = _a[1];
    var _b = (0, react_1.useState)(0), position = _b[0], setPosition = _b[1];
    var _c = (0, react_1.useState)({ cursorX: 0, scrollY: 0, position: 0 }), origin = _c[0], setOrigin = _c[1];
    var _d = (0, react_1.useState)({ originX: 0, cursorX: 0, direction: 'none' }), direction = _d[0], setDirection = _d[1];
    var _e = (0, react_1.useState)(false), isDragging = _e[0], setDragging = _e[1];
    var _f = (0, react_1.useState)(false), isResizing = _f[0], setResizing = _f[1];
    var _g = (0, react_1.useState)(false), isScrolling = _g[0], setScrolling = _g[1];
    var _h = (0, react_1.useState)(false), disabled = _h[0], setDisabled = _h[1];
    var _j = (0, react_1.useState)(false), isInit = _j[0], setInit = _j[1];
    // get animate flag
    var shouldAnimate = !isDragging && snap && isInit && !isResizing;
    // method to get slider data
    var getData = function () { return (0, getSliderData_1.getSliderData)({
        outer: outerRef,
        inner: innerRef,
        child: childRef
    }, options, direction); };
    // event on cursor down
    var onDown = function (event) {
        var _a;
        // update dragging state
        if (!draggable) {
            return;
        }
        else {
            setDragging(true);
        }
        // get positions
        var cursorX = (0, getEventData_1.getEventData)(event).screenX;
        var scrollY = (_a = document === null || document === void 0 ? void 0 : document.documentElement) === null || _a === void 0 ? void 0 : _a.scrollTop;
        // store origin values
        setOrigin({ cursorX: cursorX, scrollY: scrollY, position: position });
        // store direction values
        setDirection({ originX: cursorX, cursorX: cursorX, direction: 'none' });
    };
    // event on cursor up
    var onUp = function () {
        // set current slide if user was dragging
        if (isDragging) {
            setSlide();
        }
        // reset scroll and dragging states
        setScrolling(false);
        setDragging(false);
    };
    // event on cursor drag
    var onDrag = function (event) {
        var _a, _b;
        // return on page scroll
        if (isScrolling) {
            return;
        }
        // return on page scroll start
        if (((_a = document === null || document === void 0 ? void 0 : document.documentElement) === null || _a === void 0 ? void 0 : _a.scrollTop) !== origin.scrollY) {
            setScrolling(true);
            return;
        }
        // get slider data
        var data = getData();
        // get cursor x position
        var cursorX = (_b = (0, getEventData_1.getEventData)(event)) === null || _b === void 0 ? void 0 : _b.screenX;
        // get gap direction
        var gapDirection = direction.cursorX > cursorX ? 'left' : 'right';
        // get origin
        var dirOrigin = gapDirection === direction.direction
            ? direction.originX
            : cursorX;
        // update direction
        setDirection({
            originX: dirOrigin,
            cursorX: cursorX,
            direction: gapDirection
        });
        // get total drag difference
        var dragGapT = origin.cursorX - cursorX;
        // get current position
        var position = (0, getPositionByBound_1.getPositionByBound)(origin.position - dragGapT, data, dragOutbound);
        // set position
        setPosition(position);
        // callback to parent
        if (dragCallback && data) {
            options === null || options === void 0 ? void 0 : options.onSlide(data.index);
        }
    };
    // method to set slide by index
    var setSlide = function (slideIndex, callback, forceLeap) {
        // get slide data
        var data = getData();
        // return if no data
        if (!data) {
            return;
        }
        // get param values
        var resultIndex = typeof slideIndex === 'number' ? slideIndex : data.index;
        var resultCallback = typeof callback === 'boolean' ? callback : true;
        // get current position
        var position = (0, getPositionByBound_1.getPositionByBound)(data.stops[resultIndex].anchor, data, snapOutbound);
        // set current slide position
        if (snap || forceLeap) {
            setPosition(position);
        }
        // update index
        setIndex(resultIndex);
        // callback index
        if (resultCallback) {
            options === null || options === void 0 ? void 0 : options.onSlide(resultIndex);
        }
    };
    // check for slide index change from parent component
    if (!isDragging && index !== options.index) {
        // update slide by parent
        setSlide(options.index, false, true);
    }
    // method to check no slider
    var checkNoSlider = function () {
        if (!outerRef.current) {
            return false;
        }
        var style = getComputedStyle(outerRef.current);
        var state = style === null || style === void 0 ? void 0 : style.content.includes('no-slider');
        setDisabled(state);
        return state;
    };
    // effect on mount
    (0, react_1.useEffect)(function () {
        // resize event listener
        window.addEventListener('resize', function () {
            // check no slider
            if (!checkNoSlider()) {
                // set slide without animating while resize flag enabled
                setResizing(true);
                setSlide();
                setTimeout(function () { return setResizing(false); }, 100);
            }
        });
        // check no slider
        if (checkNoSlider()) {
            // immediate init
            setInit(true);
        }
        else {
            // set initial slide
            setSlide(index);
            // wait until slider snap to initial slide without animating
            setTimeout(function () { return setInit(true); }, 30);
        }
    }, []);
    // slider dom
    return disabled ? (react_1.default.createElement("div", { className: options.className, ref: outerRef }, options.children)) : (react_1.default.createElement("div", { style: style_1.outerCSS, ref: outerRef, className: options.className, onMouseDown: onDown, onTouchStart: onDown, onMouseUp: onUp, onMouseLeave: onUp, onTouchEnd: onUp, onTouchCancel: onUp, onMouseMove: function (event) { return isDragging && draggable && onDrag(event); }, onTouchMove: function (event) { return isDragging && draggable && onDrag(event); } },
        react_1.default.createElement("div", { ref: innerRef, style: __assign({ transform: "translateX(".concat(position, "px)"), transitionDuration: "".concat(snapDuration / 1000, "s"), transitionProperty: shouldAnimate ? 'transform' : 'none' }, style_1.innerCSS) }, children.map(function (child, childIndex) { return (react_1.default.createElement("div", { key: "".concat(childIndex.toString()), ref: function (element) { childRef.current[childIndex] = element; }, style: style_1.childCSS }, child)); }))));
}
exports.default = Slider;
