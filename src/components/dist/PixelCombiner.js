"use strict";
exports.__esModule = true;
exports.createCombinedPixel = void 0;
var Pixel_1 = require("../models/Pixel");
function createCombinedPixel(pixelsToCombine) {
    var redChannels = [];
    var blueChannels = [];
    var greenChannels = [];
    var alphaChannels = [];
    for (var _i = 0, pixelsToCombine_1 = pixelsToCombine; _i < pixelsToCombine_1.length; _i++) {
        var pixel = pixelsToCombine_1[_i];
        redChannels.push(pixel.getRedChannel());
        greenChannels.push(pixel.getGreenChannel());
        blueChannels.push(pixel.getBlueChannel());
        alphaChannels.push(pixel.getAlphaChannel());
    }
    return getCombinedPixel(redChannels, greenChannels, blueChannels, alphaChannels);
}
exports.createCombinedPixel = createCombinedPixel;
function getCombinedPixel(reds, greens, blues, alphas) {
    var redAverage = getAverageColor(reds);
    var greenAverage = getAverageColor(greens);
    var blueAverage = getAverageColor(blues);
    var alphaAverage = getAverageColor(alphas);
    return new Pixel_1.Pixel(redAverage, greenAverage, blueAverage, alphaAverage);
}
function getAverageColor(colors) {
    return colors.reduce(function (channelAccumulation, colorChannelValue) {
        return channelAccumulation += colorChannelValue;
    }, 0) / colors.length;
}
