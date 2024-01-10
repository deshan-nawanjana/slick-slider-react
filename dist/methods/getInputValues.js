"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputValues = void 0;
/**
 * Get slider props configuration object with default values
 *
 * @param input Slider props input object
 * @returns Slider props object with default values for any missing inputs
 */
var getInputValues = function (input) { return ({
    className: input.className,
    children: input.children,
    index: 'index' in input ? input.index : 0,
    onSlide: input.onSlide,
    alignment: 'alignment' in input ? input.alignment : 'center',
    snap: 'snap' in input ? input.snap : true,
    snapDuration: 'snapDuration' in input ? input.snapDuration : 400,
    snapOutbound: 'snapOutbound' in input ? input.snapOutbound : false,
    draggable: 'draggable' in input ? input.draggable : true,
    dragCallback: 'dragCallback' in input ? input.dragCallback : true,
    dragOutbound: 'dragOutbound' in input ? input.dragOutbound : true,
    dragFactor: 'dragFactor' in input ? input.dragFactor : 30
}); };
exports.getInputValues = getInputValues;
