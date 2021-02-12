"use strict";
exports.__esModule = true;
var React = require("react");
var GridPixel = function (props) {
    var gridPixelStyle = {
        backgroundColor: "rgba(" + props.pixel.getRedChannel() + "," + props.pixel.getGreenChannel() + "," + props.pixel.getBlueChannel() + "," + props.pixel.getAlphaChannel() + ")"
    };
    return (React.createElement("span", { className: "pixel", style: gridPixelStyle }));
};
exports["default"] = GridPixel;
