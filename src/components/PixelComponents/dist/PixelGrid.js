"use strict";
exports.__esModule = true;
var React = require("react");
var PixelGridRow_1 = require("./PixelGridRow");
var PixelationService_1 = require("../../services/PixelationService");
var PixelGrid = function (props) {
    var createPixelRows = function () {
        var pixelsToRender = props.gridType === "pixelated" ? PixelationService_1.getPixelatedImage(props.pixels, props.factor) : props.pixels;
        return (React.createElement(React.Fragment, null, pixelsToRender.map(function (pixelRow, index) {
            return React.createElement(PixelGridRow_1["default"], { key: index, pixels: pixelRow, factor: props.factor, gridType: props.gridType });
        })));
    };
    return props.pixels && props.gridType && createPixelRows();
};
exports["default"] = PixelGrid;
