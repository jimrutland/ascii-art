"use strict";
exports.__esModule = true;
var React = require("react");
var AsciiPlainPixel_1 = require("./AsciiPlainPixel");
var GridPixel_1 = require("./GridPixel");
var PixelGridRow = function (props) {
    var createGridRow = function () {
        switch (props.gridType) {
            case "asciiGray":
                return props.pixels.map(function (pixel, pixelIndex) {
                    return React.createElement(AsciiPlainPixel_1["default"], { key: pixelIndex, pixel: pixel });
                });
            case "pixelated":
                return props.pixels.map(function (pixel, pixelIndex) {
                    return React.createElement(GridPixel_1["default"], { key: pixelIndex, pixel: pixel, factor: props.factor });
                });
            default:
                break;
        }
    };
    return (React.createElement("div", { className: "pixelGridRow" }, createGridRow()));
};
exports["default"] = PixelGridRow;
