"use strict";
exports.__esModule = true;
exports.Pixel = void 0;
var Pixel = /** @class */ (function () {
    function Pixel(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
    Pixel.prototype.getRedChannel = function () {
        return this.red;
    };
    Pixel.prototype.getBlueChannel = function () {
        return this.blue;
    };
    Pixel.prototype.getGreenChannel = function () {
        return this.green;
    };
    Pixel.prototype.getAlphaChannel = function () {
        return this.alpha;
    };
    Pixel.prototype.getIntensity = function () {
        return (this.red + this.green + this.blue) / 3;
    };
    Pixel.brightnessChars = ' .`^",:;Il!i><~+_-?][}{1)(|tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';
    return Pixel;
}());
exports.Pixel = Pixel;
