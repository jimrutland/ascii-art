"use strict";
exports.__esModule = true;
exports.getColorShiftedImage = void 0;
var Pixel_1 = require("../models/Pixel");
function getColorShiftedImage(pixelMatrix) {
    return pixelMatrix.map(function (pixelRow) {
        return pixelRow.map(function (pixel) {
            return new Pixel_1.Pixel(pixel.getGreenChannel(), pixel.getBlueChannel(), pixel.getRedChannel(), pixel.getAlphaChannel());
        });
    });
}
exports.getColorShiftedImage = getColorShiftedImage;
