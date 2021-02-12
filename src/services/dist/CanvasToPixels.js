"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.getPixelsForCanvas = void 0;
var Pixel_1 = require("../models/Pixel");
function getPixelsForCanvas(canvas) {
    var ctx = canvas.getContext("2d");
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    var pixels = [];
    var pixelRow = [];
    var count = 0;
    for (var index = 0; index <= imageData.length; index += 4) {
        var red = imageData[index];
        var green = imageData[index + 1];
        var blue = imageData[index + 2];
        var alpha = imageData[index + 3];
        var pixel = new Pixel_1.Pixel(red, green, blue, alpha);
        if (count === canvas.width) {
            count = 0;
            pixels.push(__spreadArrays(pixelRow));
            pixelRow = [pixel];
        }
        else {
            pixelRow.push(pixel);
        }
        count++;
    }
    return pixels;
}
exports.getPixelsForCanvas = getPixelsForCanvas;
