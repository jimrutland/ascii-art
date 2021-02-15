"use strict";
exports.__esModule = true;
exports.getInvertedColorImage = void 0;
var Pixel_1 = require("../models/Pixel");
function getInvertedColorImage(pixelMatrix) {
    var invertedImage = [];
    for (var rowIndex = 0; rowIndex < pixelMatrix.length; rowIndex++) {
        for (var columnIndex = 0; columnIndex < pixelMatrix[rowIndex].length; columnIndex++) {
            var pixel = pixelMatrix[rowIndex][columnIndex];
            var invertedPixel = new Pixel_1.Pixel(255 - pixel.getRedChannel(), 255 - pixel.getGreenChannel(), 255 - pixel.getBlueChannel(), pixel.getAlphaChannel());
            if (invertedImage[rowIndex]) {
                invertedImage[rowIndex][columnIndex] = invertedPixel;
            }
            else {
                invertedImage[rowIndex] = [invertedPixel];
            }
        }
    }
    return invertedImage;
}
exports.getInvertedColorImage = getInvertedColorImage;
