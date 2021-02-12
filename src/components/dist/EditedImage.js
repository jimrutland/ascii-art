"use strict";
exports.__esModule = true;
var React = require("react");
var react_1 = require("react");
var EditedImage = function (props) {
    var imageCanvas = react_1.useRef();
    var drawImage = function () {
        var context = imageCanvas.current.getContext("2d");
        var newImageData = props.pixels.reduce(function (accumulation, currentPixelRow) {
            for (var _i = 0, currentPixelRow_1 = currentPixelRow; _i < currentPixelRow_1.length; _i++) {
                var pixel = currentPixelRow_1[_i];
                accumulation.push(pixel.getRedChannel());
                accumulation.push(pixel.getGreenChannel());
                accumulation.push(pixel.getBlueChannel());
                accumulation.push(pixel.getAlphaChannel());
            }
            return accumulation;
        }, []);
        var pixelDataForImage = new ImageData(Uint8ClampedArray.from(newImageData), props.pixels.length, props.pixels.length);
        context.putImageData(pixelDataForImage, 0, 0);
    };
    react_1.useEffect(drawImage, [props.pixels]);
    return (React.createElement("canvas", { width: 800, height: 800, ref: imageCanvas }));
};
exports["default"] = EditedImage;
