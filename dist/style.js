"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.childCSS = exports.innerCSS = exports.outerCSS = void 0;
/** Outer element default style */
exports.outerCSS = {
    overflow: 'hidden',
    userSelect: 'none',
    touchAction: 'pan-y'
};
/** Inner element default style */
exports.innerCSS = {
    display: 'flex',
    gap: 'inherit',
    width: 'fit-content'
};
/** Child element default style */
exports.childCSS = {
    flexShrink: 0,
    display: 'flex'
};
