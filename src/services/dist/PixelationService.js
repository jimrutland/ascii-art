"use strict";
exports.__esModule = true;
exports.getPixelatedImage = void 0;
var PixelCombiner_1 = require("../components/PixelComponents/PixelCombiner");
function getPixelatedImage(pixelMatrix, factor) {
    var pixelatedImage = [];
    for (var rowIndex = 0; rowIndex < pixelMatrix.length; rowIndex += factor) {
        var pixelatedRow = [];
        for (var columnIndex = 0; columnIndex < pixelMatrix[rowIndex].length; columnIndex += factor) {
            pixelatedRow.push(PixelCombiner_1.createCombinedPixel(getChunkOfPixelsFromPosition(pixelMatrix, rowIndex, columnIndex, factor)));
        }
        pixelatedImage.push(pixelatedRow);
    }
    return pixelatedImage;
}
exports.getPixelatedImage = getPixelatedImage;
function getChunkOfPixelsFromPosition(pixelMatrix, rowIndex, columnIndex, factor) {
    var pixelChunk = [];
    for (var i = 0; i < factor; i++) {
        for (var j = 0; j < factor; j++) {
            if (pixelMatrix[rowIndex + i] && pixelMatrix[rowIndex + i][columnIndex + j])
                pixelChunk.push(pixelMatrix[rowIndex + i][columnIndex + j]);
            else
                break;
        }
    }
    return pixelChunk;
}
