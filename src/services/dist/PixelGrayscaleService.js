"use strict";
exports.__esModule = true;
exports.getGrayscaledImage = void 0;
var Pixel_1 = require("../models/Pixel");
function getGrayscaledImage(pixelMatrix) {
    var grayScaleImage = [];
    for (var rowIndex = 0; rowIndex < pixelMatrix.length; rowIndex++) {
        for (var columnIndex = 0; columnIndex < pixelMatrix[rowIndex].length; columnIndex++) {
            if (grayScaleImage[rowIndex]) {
                grayScaleImage[rowIndex].push(getGrayscalePixel(pixelMatrix[rowIndex][columnIndex]));
            }
            else {
                grayScaleImage[rowIndex] = [pixelMatrix[rowIndex][columnIndex]];
            }
        }
    }
    return grayScaleImage;
}
exports.getGrayscaledImage = getGrayscaledImage;
function getGrayscalePixel(pixel) {
    return new Pixel_1.Pixel(pixel.getIntensity(), pixel.getIntensity(), pixel.getIntensity(), pixel.getAlphaChannel());
}
